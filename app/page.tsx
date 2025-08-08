import Image from "next/image";
import iosImage from './../public/assets/jamerator-example.png'

export default function Home() {
  return (
      <div>
          <div className="bg-[#0D1210] min-h-screen p-6">
              <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-16 py-8">
                      <div className="lg:col-span-2">
                          <div className="text-center lg:text-left font-bold text-4xl lg:text-6xl text-white mb-6">
                              Guitar Chord Progression Generator
                          </div>
                          <p className="text-center lg:text-left text-xl font-medium text-gray-400 mb-8">
                              Whether you're riffing solo or rocking out with friends, Jamerator supercharges your creativity with over 3,000 chord progression combos. Spark fresh ideas, break out of your routine, and keep the vibes flowing—anytime, anywhere. Perfect for impromptu garage jams, late-night bonfire sessions, or locking in tight grooves with your bandmates. Stay inspired. Stay jamming.
                          </p>
                          <div className="flex justify-center lg:justify-start">
                              <a href="https://jamerator-app.vercel.app/"
                                 className="text-center text-lg font-bold bg-[#85B59C] hover:bg-green-300 text-black px-4 py-2 inline-flex items-center rounded-lg">
                                  Try Jamerator
                              </a>
                          </div>
                      </div>
                      <div className="flex justify-center">
                          <Image src={iosImage} alt=""/>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}
