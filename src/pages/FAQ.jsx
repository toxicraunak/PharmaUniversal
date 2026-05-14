import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const faqData = [
  {
    question: "WHY ONLINE METHOD IS PREFERRED OVER OTHER PAYMENT MODES?",
    answer: `We always try to simple and secure methods for payments. In the market, they have supple options to get the medications only when they have a prescription. You cannot get these medicine directly from any manufacturer, doctor or hospital. To help our customers we are offering a simple and easy way of payment. This is a safe and secure platform to complete the payment.

    Our primary priority is customer satisfaction. To fulfil the requirements of our clients, we always provide them with quality medicine and many additional benefits. To give them hassle-free online transactions, Online Payment is a superior option. By clicking on the link, you can easily access a card to your account in the online method. This entire process does not affect your recurring payments, subscriptions, and billing agreements. That’s the primary reason we always give the priority to Online Method.`
  },
  {
    question: "IT IS SAFE TO SELECT AN ONLINE PHARMACY TO BUY MEDICINE?",
    answer: "Yes, selecting a reputable online pharmacy is safe. We prioritize your privacy and security, using encrypted payment methods and ensuring that all medications are sourced from reliable suppliers."
  },
  {
    question: "HOW TO GET THE TRACKING NUMBER AND WHAT WILL BE THE DELIVERY TIME?",
    answer: "Once your order is shipped, you will receive an email with your tracking number. Delivery times typically range from 7 to 14 business days depending on your location."
  },
  {
    question: "DO ALL THESE MEDICINES ARE APPROVED AND SAFE?",
    answer: "All medicines available on our platform are sourced from certified manufacturers and comply with international safety standards."
  },
  {
    question: "I DID NOT RECEIVE A CONFIRMATION EMAIL",
    answer: "Please check your spam or junk folder. If you still can't find it, contact our support team with your order details."
  },
  {
    question: "HOW CAN I ORDER THESE MEDICINES?",
    answer: "Simply browse our categories, add the desired products to your cart, and proceed to checkout. Follow the instructions to complete your payment."
  },
  {
    question: "WHAT IS THE CORRECT DOSAGE FOR INSOMNIA MEDICATION?",
    answer: "Dosage varies depending on the specific medication and your individual health condition. Always consult with a healthcare professional or follow the instructions on the product label."
  },
  {
    question: "WHAT HAPPENS WHEN I USE TRAMADOL ALONG WITH OTHER MEDICINES?",
    answer: "Drug interactions can be dangerous. It is crucial to inform your doctor about all medications you are currently taking before starting Tramadol."
  }
];

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-sm">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-4 text-left transition-all duration-300 cursor-pointer ${
          isOpen ? 'bg-white border-l-2 border-l-primary' : 'bg-gray-200/60'
        } group`}
      >
        <span className={`text-[13px] font-heading font-black tracking-wide ${
          isOpen ? 'text-primary' : 'text-[#666666]'
        } group-hover:text-primary transition-colors`}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={isOpen ? 'text-primary' : 'text-gray-400'}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white border-l-2 border-primary"
          >
            <div className="p-6 text-[#666666] font-display text-[14px] leading-relaxed whitespace-pre-line">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white min-h-screen">
      <Helmet defer={false}>
        <title>FAQ - Pharmacy Universal</title>
      </Helmet>
      {/* Header Section */}
      <div className="border-b border-gray-100 py-8 mb-12 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-heading font-black text-primary tracking-tight">FAQ</h1>
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">FAQ</span>
          </nav>
        </div>
      </div>

      {/* Accordion Section */}
      <div className="container mx-auto px-4 max-w-6xl pb-20">
        <div className="space-y-2">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
