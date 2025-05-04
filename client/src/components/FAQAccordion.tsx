import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition-colors"
            onClick={() => toggleFAQ(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-content-${index}`}
          >
            <span className="font-medium">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="h-5 w-5 flex-shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 flex-shrink-0" />
            )}
          </button>
          <div
            id={`faq-content-${index}`}
            className={`p-4 bg-gray-50 border-t border-gray-200 ${openIndex === index ? 'block' : 'hidden'}`}
          >
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
