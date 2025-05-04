import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  rating: number;
  text: string;
  author: {
    name: string;
    title: string;
    image: string;
  };
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      rating: 5,
      text: "As an emergency physician, LifeChip has completely changed how we access critical patient information. In true emergencies, having instant access to allergies and medications can literally save lives.",
      author: {
        name: "Dr. Sarah Johnson",
        title: "Emergency Medicine, City Hospital",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80"
      }
    },
    {
      rating: 5,
      text: "I have severe allergies and a complex medical history. My LifeChip gives me peace of mind knowing that if I'm ever unconscious or unable to communicate, medical professionals will still have access to my critical information.",
      author: {
        name: "Michael Rodriguez",
        title: "LifeChip User",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80"
      }
    },
    {
      rating: 4.5,
      text: "Our ambulance crews have found LifeChip incredibly valuable. The ability to quickly scan and access patient information has streamlined our initial assessment process and improved our decision-making in the field.",
      author: {
        name: "Emma Thompson",
        title: "Paramedic Supervisor, Metro EMS",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80"
      }
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">What People Are Saying</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Hear from healthcare professionals and LifeChip users about their experiences.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                  {testimonial.rating % 1 !== 0 && (
                    <Star className="h-5 w-5 fill-current" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                  )}
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 overflow-hidden">
                  <img 
                    src={testimonial.author.image} 
                    alt={testimonial.author.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.author.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.author.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
