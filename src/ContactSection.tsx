const ContactSection = () => {
  return (
    <section className="bg-[#F8F7F4] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="text-center mb-16">
          <span className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-neutral-400 mb-6 block">
            Get in Touch
          </span>
          <h2 className="font-display text-[10vw] md:text-[7vw] lg:text-[5vw] uppercase tracking-tighter text-neutral-900 leading-none">
            Contact Us
          </h2>
          <p className="font-sans text-sm md:text-base 2xl:text-lg text-neutral-500 mt-6 max-w-lg mx-auto leading-relaxed">
            Ready to bring your vision to life? Reach out and let's create
            something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="flex flex-col gap-8">
            <div>
              <h5 className="font-serif italic text-lg 2xl:text-xl text-neutral-900 mb-2">
                Address
              </h5>
              <p className="font-sans text-sm 2xl:text-base text-neutral-500 leading-relaxed">
                Meydan Grandstand - 6th Floor
                <br />
                Al Meydan Rd - Nad Al Sheba
                <br />
                Nadd Al Shiba First - Dubai - UAE
              </p>
            </div>
            <div>
              <h5 className="font-serif italic text-lg 2xl:text-xl text-neutral-900 mb-2">
                Phone
              </h5>
              <p className="font-sans text-sm 2xl:text-base text-neutral-500">
                +44 (0) 20 7123 4567
              </p>
            </div>
            <div>
              <h5 className="font-serif italic text-lg 2xl:text-xl text-neutral-900 mb-2">
                Email
              </h5>
              <p className="font-sans text-sm 2xl:text-base text-neutral-500">
                hi@falcondesign.com
              </p>
            </div>
          </div>

          <div className="w-full h-[300px] md:h-[400px] overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.12!2d55.3010963!3d25.1563618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69e537d5b05b%3A0xd0a447d8524e2194!2sFalcon+Design+LLC!5e0!3m2!1sen!2sae!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Falcon Design Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
