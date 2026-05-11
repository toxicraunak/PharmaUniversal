import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Package, Lock, Zap, Truck, Quote } from 'lucide-react';
import WebBanner02 from "../assets/media/WebBanners02.webp";
import WebBanner03 from "../assets/media/WebBanners03.webp";
import testiBg from "../assets/media/testi_bg-1.webp";
import Doctor from "../assets/media/Doctor.png";

const Feature = ({ title, desc, icon: Icon, align = 'left' }) => (
  <div className={`flex items-start gap-4 ${align === 'right' ? 'flex-row-reverse text-right' : 'text-left'}`}>
    <div className="shrink-0 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:border-primary/50 transition-colors">
      <Icon className="text-gray-700" size={24} />
    </div>
    <div className="flex flex-col">
      <h4 className="text-[16px] lg:text-[18px] font-heading! font-bold text-primary mb-1">
        {title}
      </h4>
      <p className="text-[13px] lg:text-[14px] text-gray-500 leading-snug max-w-[200px]">
        {desc}
      </p>
    </div>
  </div>
);

const WhyUs = ({ config }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Main Content Box with Dotted Border */}
        <div className="relative border-2 border-dashed border-primary/40 rounded-[60px] p-8 lg:p-16 mb-12">
          
          <div className="text-center mb-12">
            <h2 className="text-[26px] lg:text-[32px] font-heading! font-bold text-[#222222]">
              Why Choose Pharma Universal
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Features */}
            <div className="flex flex-col gap-12 order-2 lg:order-1">
              <Feature 
                title="Secure Payments" 
                desc="Safest payment method used." 
                icon={ShieldCheck} 
              />
              <Feature 
                title="Discreet Package" 
                desc="Medicine Delivery in Plain Padded Envelopes." 
                icon={Package} 
              />
              <Feature 
                title="Confidential Data" 
                desc="Privacy of our customers very seriously and ensure that information is secure and confidential." 
                icon={Lock} 
              />
            </div>

            {/* Center Doctor Image */}
            <div className="relative z-10 order-1 lg:order-2">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                src={Doctor} 
                alt="Doctor"
                className="w-full max-w-[350px] mx-auto"
              />
            </div>

            {/* Right Features */}
            <div className="flex flex-col gap-12 order-3">
              <Feature 
                title="Fast Checkout" 
                desc="Faster Checkout experience than ever before." 
                icon={Zap} 
              />
              <Feature 
                title="Fast Shipping" 
                desc="Speedy Online Pharmacy Delivery Service." 
                icon={Truck} 
              />
            </div>

          </div>
        </div>

        {/* Bottom Mission Text */}
        <div className="max-w-6xl mx-auto text-black font-display! text-base">
          <p className="leading-relaxed text-left lg:text-justify">
            Since the beginning, we had spread our wings to deliver reliable medicines of all kinds, be it <span className="span-link thick">Sleeping Tablets Online</span><span className="font-semibold">, Anxiety medication , erectile dysfunction pills, painkillers medication,</span> and generic medicines. We aim to improve sleep hygiene, sexual life, pleasurable life, ensuring you make the most of improved wellness.
            </p>
            <br />

          <p className="leading-relaxed text-left lg:text-justify">
            Efforts have been put in to provide unmatched comfort and convenience to all our international customers. Here at pharma universal, we provide high-quality, safe, effective, and strong sleeping pills, erectile dysfunction, <span className="span-link">anti-anxiety medications</span>, and pain relief medications at reasonable prices that gradually contribute to enhancing your overall well-being simultaneously. All medicines have been designed to transform your debilitating health into improved health.
          </p>

          <br />

          <p className="leading-relaxed text-left lg:text-justify">
            There have been many surveys that have clarified, almost <span className="span-link">40% population</span> of the world feel difficulty during sleep in their daily routines. Sleep is unavoidable and an important aspect of an individual’s life that prepares the body to sail through the tasks physically as well as mentally. Proper sleep is a sign of healthy life and here we emphasize overall health not just sleep. Just like the way inadequate sleep fails to allow the body function properly, in the same way, lack of sexual life due to erectile problems leads to the end of personal relationships and loss of potency.
          </p>
          <br />

          <p className="leading-relaxed text-left lg:text-justify">
            Nowadays deterioration in health is common and every third person can be seen grappling with some sort of health problem. People are suffering from sleeping disorders like insomnia, <span className="span-link">anxiety</span>, obstructive sleep apnea, erectile dysfunction, and unbearable pain situations. Such disorders affect your personality and come in the way of people’s health and fitness in critical ways. Pharma universal considers health above all and takes all possible precautionary measures at the time of manufacturing medications. We prioritize health and hand over the benefits of quality medication to our esteemed customers in the form of <span className="span-link thick">Pain medication USA</span><span className="font-semibold">, Erectile Dysfunction pills USA, Sleeping Pills USA and Anxiety medication USA.</span>
          </p>
          <br />

          <p className="leading-relaxed text-left lg:text-justify">As a trusted and reputed online pharmacy, we match the highest standards, offering our customers all kinds of <span className="span-link thick">sleeping pills</span><span className="font-semibold">, pain relief medications, and anxiety medication</span> at reasonable prices.</p>
        </div>
        <div className="flex flex-col gap-y-1.5 justify-start border-l-6 border-primary max-w-6xl mx-auto my-6 p-4 bg-primary/10">
          <p>
            <span className="text-3xl! font-heading! text-primary font-bold pb-2 mb-3 block">{config?.siteName} Your Trusted Online Pharmacy in USA</span>
            <span className="italic text-lg">Who doesn’t trap in the misery of bad health conditions, everyone does. So far as your health is concerned, {config?.siteName} takes the accountability to give you enhanced health and brings all the happiness, ensuring to bring back your good health. However, it is up to you to decide who should be entrusted the responsibility to take care of your body. Not just the physical pharmacy, today online pharmacies are brimming with fake people who claim to treat your health and even take away the least possibilities of treatment you hope for.</span>
          </p>
        </div>
        <div className="flex flex-col gap-y-1.5 justify-start max-w-6xl mx-auto my-6">
          <img className="rounded-xl" src={WebBanner02} alt="" />
        </div>
        <div className="max-w-6xl mx-auto text-black font-display! text-base">
          <p className="leading-relaxed text-left lg:text-justify">
            You have to decide what to do with your body and choose medicines from a <span className="font-semibold">reliable online pharmacy</span>. {config.siteName} offers you to experience the outcome of its licensed and certified online pharmacy that meets your health issues and requirement with ease. We take complete charge of your health and advise you to do complete justice to your health. Without health, the purpose of life has no significance nor can lead you to the right path. If you ask us, aside from suggesting you right medicines against the ailments, we suggest you visit the renowned doctors who prescribe medicines based on your current medical condition.
          </p>
          <br />
          <p className="leading-relaxed text-left lg:text-justify">
            Now, you don’t need to drain yourself thinking about how you would find the right medicine to get rid of your sexual disorders, <span className="span-link">sleeping problems</span>, and pain issues. You can leave your worries and fears in the corner and regain your full erectile power, complete sleep, and freedom from pain within few days. {config.siteName} is the best online pharmacy that meets your health requirements in one place, offering you effective medications such as <span className="font-semibold">Pain medication USA,</span> <span className="span-link thick">Anxiety medication USA</span><span className="font-semibold">, and ED medicine in USA</span>.
          </p>
          <br />
          <p className="leading-relaxed text-left lg:text-justify">
            Every man today has the opportunity to take advantage of this opportunity those {config.siteName.toLowerCase()} offers. To get back the full-blown sexual life, long hours sleep, and blissful life away from the pain are signs of complete and healthy life. Struggling to achieve excellence in sexual life due to penile issues is a real psychological problem that needs to be addressed.
          </p>
          <br />
          <p className="leading-relaxed text-left lg:text-justify">
            The severe or moderate pain knocks at your mental door as uneasiness, and lack of sleep retains your irritability as long as you are on the bed are nothing but a huge block in your life. To get rid of all these problems, not just a medicine but a <span className="font-semibold">quality medicine from reliable online pharmacy</span> like {config.siteName.toLowerCase()} that has perfect solutions to against all your disorders.
          </p>
          <br />
          <p className="leading-relaxed text-left lg:text-justify">
            Our range of medicines offers you a great deal that can eradicate your health issues in no time, helping bring your optimal health back. We assure you of the guaranteed health as long as you continue using our medications but remember doctor’s recommendation is a must.
          </p>
        </div>
        <div className="flex flex-col gap-y-1.5 justify-start border-l-6 border-primary max-w-6xl mx-auto mt-8 mb-6 p-4 bg-primary/10">
          <p>
            <span className="text-3xl! font-heading! text-primary font-bold pb-2 mb-3 block">Why Choose US?</span>
            <span className="italic text-lg">{config?.siteName} is the most trusted online pharmacy that strives to show exemplary devotion to the health of the people. Our efforts depict the care for people who struggle in their daily life owing to infiltration of health implications. We provide them the quality Pain medication USA, Erectile Dysfunction pills USA, and Anxiety medication USA across the globe without any inconvenience.</span>
            <br />
            <span className="italic text-lg">Here at {config?.siteName}, you experience the turnaround in your health days after using the medicine. You can take with you all generic medicine at maximum discounts rates along with the guarantee of improvement in health. We understand the expectations of customers and offer them the best sleeping pills, anti-anxiety pills, and erectile dysfunctions pills. Moreover, you can ask for assistance 24*7 regarding the quantity, quality, or any other issue.</span>
          </p>
        </div>

        <div className="max-w-6xl mx-auto text-black font-display! text-base">
          <h2 className="text-4xl font-bold text-primary font-heading!">Low and stable prices ED, Pain & Anxiety Medication in USA</h2>
          <p className="leading-relaxed text-left lg:text-justify">
            Customer satisfaction is our topmost priority and this reason keeps us going with more confidence with each passing day. We deliver high-quality, safe, easy to use, and <span className="font-semibold">effective anti-anxiety pills,</span> <span className="span-link thick">erectile dysfunctions pills</span><span className="font-semibold">, and sleeping pills</span> at affordable prices. Not just the health but we also take care of the pocket of the people who slog throughout the day to earn the money.
          </p>
        </div>

        <div className="flex flex-col gap-y-1.5 justify-start max-w-6xl mx-auto my-6">
          <img className="rounded-xl" src={WebBanner03} alt="" />
        </div>

        <div className="max-w-6xl mx-auto text-black font-display! text-base">
          <p className="leading-relaxed text-left lg:text-justify">
            We strive to deliver excellence through our products and services, ensuring each of our customers returns home contented and gratified. Our customer support team provides assistance 24*7 and takes proper care of your personal information also. You can order your medicine with quantity prescribed to you by the doctor and wait no longer for your medicine to get delivered to your address in 3-4 Days.
          </p>
        </div>

        {/* Testimonial Section */}
        <div className="container mx-auto px-4 max-w-300 mt-20">
          <div 
            className="relative rounded-[60px] overflow-hidden py-24 px-8 lg:px-16"
            style={{ 
              backgroundImage: `url(${testiBg})`,
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {[
                {
                  text: "Thank you to a great online pharmacy to get what we need in times that are questionable at best! Reliable and timely shipping, and will always get a response when contacting customer service.",
                  author: "SHARON WILLS"
                },
                {
                  text: "Great service, always fast as sufficient and easy to get hold of if needed , highly. Recommend",
                  author: "CHERRY"
                },
                {
                  text: "Provided excellent communication and service, along with fast delivery and good product. Thanks",
                  author: "LEED"
                }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center text-white">
                  <Quote className="text-white mb-6" size={32} fill="white" />
                  <p className="text-[15px] lg:text-[17px] font-display italic leading-relaxed mb-8">
                    "{item.text}"
                  </p>
                  <h4 className="text-[16px] lg:text-[18px] font-heading font-bold tracking-wider">
                    {item.author}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
