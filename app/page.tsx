import Image from "next/image";
import logo from './../public/assets/Jamerator.png'
import iosImage from './../public/assets/ios-screenshot-2.png'
import Link from "next/link";

export default function Home() {
  return (
      <div>
          <div className="bg-[#0A130E] min-h-screen p-6">
              <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-16 py-8">
                      <div className="lg:col-span-2">
                          <div className="text-center lg:text-left font-bold text-4xl lg:text-6xl text-white mb-6">
                              AI Chord Progression Generator
                          </div>
                          <p className="text-center lg:text-left text-xl font-medium text-gray-400 mb-8">
                              Whether you play guitar solo or with friends, this app can completely transform your practice
                              sessions and group jam sessions. AI-powered chord progressions will power you and your band to
                              stay creative, and give you a fresh progression.
                              Perfect for on-the-go jams, hanging out with fellow band-mates, or even just chilling at a
                              bonfire.
                          </p>
                          <div className="flex justify-center lg:justify-start">
                              <a href=""
                                 className="text-center text-lg font-bold bg-[#85B59C] hover:bg-green-300 text-black px-4 py-2 inline-flex items-center rounded-lg">
                                  <svg className="inline w-4 fill-current mr-1.5 mb-0.5" viewBox="0 0 384 512"
                                       fill="currentColor"
                                       xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                                  </svg>
                                  Download for iOS
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
