export function addIdsToWords(document: Document): void {
    let idCounter = 0;
  
    // Get all relevant elements in the document
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, h7, span, b, a');
  
    // Loop through each element
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
  
      // Create a document fragment to hold the new <span> elements
      const fragment = document.createDocumentFragment();
  
      // Add the element itself to the stack
      const stack: ChildNode[] = [element];
  
      while (stack.length > 0) {
        const current = stack.pop();
  
        if (current instanceof Element) {
          // Loop through each child node of the current element
          for (let j = 0; j < current.childNodes.length; j++) {
            const node = current.childNodes[j];
  
            if (node.nodeType === Node.TEXT_NODE) {
              // If the node is a text node, split its content into an array of words
              const words = node.textContent?.split(' ');
  
              if (words) {
                // Loop through each word in the array
                for (let k = 0; k < words.length; k++) {
                  const word = words[k];
  
                  // Create a new <span> element with a unique id attribute
                  const newSpan = document.createElement('span');
                  newSpan.setAttribute('id', idCounter.toString());
  
                  // Create a text node containing the word
                  const textNode = document.createTextNode(word);
  
                  // Append the text node to the <span> element
                  newSpan.appendChild(textNode);
  
                  // Append the <span> element to the document fragment
                  fragment.appendChild(newSpan);
  
                  // Add a space character to the fragment
                  fragment.appendChild(document.createTextNode(' '));
  
                  // Increment the id counter
                  idCounter++;
                }
              }
            } else {
              // If the node is not a text node, add it to the stack
              stack.push(node);
            }
          }
        }
      }
  
      // Replace the contents of the element with the document fragment
      element.innerHTML = '';
      element.appendChild(fragment);
    }
  }
  