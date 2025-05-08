/**
 * Generates a mock book report for testing purposes
 * This is used when the OpenAI API key is not available
 */
export function generateMockReport(bookTitle, author, length) {
  console.log("Generating mock report for:", bookTitle)

  return `# Book Report: ${bookTitle} by ${author}

## Introduction
This is a book report on "${bookTitle}" by ${author}. This classic work explores themes of human nature, society, and personal growth.

## Summary
The story follows the main character through a series of challenges and growth experiences. The narrative takes place in a richly described setting that enhances the overall themes of the book.

## Main Themes
The author explores several important themes throughout the work:
- Personal identity and self-discovery
- The relationship between individuals and society
- The nature of truth and perception
- The consequences of one's actions

## Character Analysis
The protagonist demonstrates significant development throughout the story, beginning as a somewhat naive individual and gradually gaining wisdom through experience. Supporting characters provide contrast and help to highlight different aspects of the main themes.

## Personal Reflection
I found this book to be thought-provoking and engaging. The author's writing style effectively conveys both the external events and the internal struggles of the characters. The themes remain relevant to contemporary readers despite when it was written.

## Conclusion
"${bookTitle}" stands as an important work that offers valuable insights into human nature and society. Its enduring appeal lies in its exploration of universal themes and its compelling narrative structure.

[Note: This is a mock report generated for testing purposes. A real report would be more detailed and specific to the actual book.]`
}
