import React from "react";
import "../styles/accordion.css"

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionOptions {
  items: AccordionItem[];
  sectionTitle?: string;
}

export function Accordion({ items, sectionTitle }: AccordionOptions) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const handleToggle = (index: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="accordion">
      {sectionTitle && <h2>{sectionTitle}</h2>}

      {items.map((item, index) => (
        <details 
          key={index} 
          open={openIndex === index}
          onClick={handleToggle(index)}
        >
          <summary>{item.title}</summary>
          <p>{item.content}</p>
        </details>
      ))}
    </section>
  );
}
