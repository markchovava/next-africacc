import AfricaMap from "@/components/AfricaMap";
import Carousel from "@/components/Carousel";
import SlideMain from "@/components/SlideMain";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { getNewsByNum } from "@/api/getNews";
import GridNews from "@/components/GridNews";
import { getCountries } from "@/api/getCountries";
import { getOpportunitiesByNum } from "@/api/getOpportunities";
import { getTestimonialsByNum } from "@/api/getTestimonials";
import ConstructionBanner from "@/components/ConstructionBanner";



export default async function Home() {
    const [newsData, countriesData, opportunitiesData, testimonialsData] = await Promise.all([
      getNewsByNum(4), getCountries(), getOpportunitiesByNum(3), getTestimonialsByNum(4)]);
  

  return (
    <>
      <SlideMain dbData={opportunitiesData} />
      <AfricaMap />


      <section className="w-[100%] pt-[8rem] pb-[4rem]">
        <div className="w-[80%] mx-auto flex flex-col gap-5 items-center justify-center">
          <h3 className="leading-tight font-light text-center text-[2.2rem]">
            Register to become a member of the Africa Capital Club and get access to exclusive and privileged 
            Investment Opportunities in Africa. Grow your wealth with the richest continent on Earth!
          </h3>
          <Link 
          href='/membership' 
          className="text-white text-lg rounded-xl transition-all ease-in-out bg-gradient-to-br py-[1.4rem] px-[3rem] from-yellow-300 to-yellow-800 hover:drop-shadow-lg hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-800">
             Register Now
          </Link>
        </div>
      </section>

      {/*  */}
      <section className="w-[100%] pt-[6rem] pb-[4rem]">
        <div className="mx-auto w-[90%]">
          <h3 className="lg:text-[2.5rem] text-[1.8rem] lg:w-[80%] w-[90%] leading-tight mb-4">
          Affiliation with the Pan African Parliament
          </h3>
          <div className="grid lg:grid-cols-2 text-xl grid-cols-1 lg:gap-4 gap-8">
            <div className="">
            The Africa Capital Club (ACC) is deeply connected with the Pan African Parliament (PAP), utilizing its legislative authority and broad 
            influence to advance investment and economic development across Africa. As the legislative body of the African Union (AU), the PAP 
            represents all 55 Member States, playing a crucial role in fostering cooperation, integration, and sustainable growth throughout the 
            continent. To further this mission, the PAP appointed Mr. Paul Kamalesh Damji as their Ambassador for Investment Promotion and Business 
            Connectivity in Africa. The ACC acts as a vital tool to achieve the goals of the mandate given by the PAP to Ambassador Damji, promoting 
            investment and business connectivity across Africa. Together, the ACC and PAP are committed to advancing economic progress, supporting 
            entrepreneurship, and ensuring the prosperity of Africa's people.
            </div>
            <div className="">
              <ul className="text-xl">
                <li>
                  <Link href='/membership' className="group hover:bg-slate-50 flex items-center justify-between border-y border-slate-300 py-2 px-3">
                    <span>Benefits of Membership</span>
                    <FaArrowRightLong className="group-hover:translate-x-1 transition-all ease-in-out"/>
                  </Link>
                </li>
                <li>
                  <Link href='/opportunity' className="group hover:bg-slate-50 flex items-center justify-between border-y border-slate-300 py-2 px-3">
                    <span>Investment Opportunities</span>
                    <FaArrowRightLong className="group-hover:translate-x-1 transition-all ease-in-out"/>
                  </Link>
                </li>
                <li>
                  <Link href='/event' className="group hover:bg-slate-50 flex items-center justify-between border-y border-slate-300 py-2 px-3">
                    <span>Our Events</span>
                    <FaArrowRightLong className="group-hover:translate-x-1 transition-all ease-in-out"/>
                  </Link>
                </li>
                <li>
                  <Link href='/news' className="group hover:bg-slate-50 flex items-center justify-between border-y border-slate-300 py-2 px-3">
                    <span>Our Latest News</span>
                    <FaArrowRightLong className="group-hover:translate-x-1 transition-all ease-in-out"/>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <GridNews dbData={newsData} />

      {testimonialsData.data &&
      <TestimonialCarousel dbData={testimonialsData} />
      }

      {/*  */}
      <Carousel dbData={countriesData} />
    </>
  ); 
}


