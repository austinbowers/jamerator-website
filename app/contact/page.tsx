import Image from "next/image";
import logo from "@/public/assets/Jamerator.png";
import Link from "next/link";
import Formcarry from "@/app/contact/components/formcarry";

export default function Contact() {
    return (
        <div className="bg-[#0A130E] min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-16">
                    <div>
                        <div className="text-center lg:text-left font-bold text-4xl lg:text-6xl text-white mb-6">
                            Get in touch
                        </div>
                        <p className="text-center lg:text-left text-xl font-medium text-gray-400 mb-8">
                            Please do not hesitate to reach out if you have any questions feedback regarding the app.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Formcarry></Formcarry>
                    </div>
                </div>
            </div>
        </div>
    )
}