import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Header from "../components/Header";
import Hero from "../components/Hero";
import bg1 from "../assets/images/bg-boost-desktop.svg";
import bg2 from "../assets/images/bg-boost-mobile.svg";
import bg3 from "../assets/images/bg-shorten-desktop.svg";
import bg4 from "../assets/images/bg-shorten-mobile.svg";
import LinkInfoTab from "../components/LinkInfoTab";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import FeatDesc from "../components/FeatDesc";
import { BASE_URL, endpoints } from "../Constants/Links";

const Home = () => {
  const [link, setLink] = useState("");
  const [actualWebsite, setActualWebsite] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [shortId, setshortId] = useState(``);
  const fetchLinkData = async (link) => {
    try {
      console.log(link);
      const response = await axios.post(endpoints.GET_URL, {
        redirectUrl: link,
      });

      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["linkData", link],
    queryFn: () => fetchLinkData(link),
    enabled: false,
  });

  const HandleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const HandleLink = (e) => {
    setLink(e.target.value);
  };
  const handleclick = async () => {
    console.log("clicked");

    try {
      const res = await axios.get(endpoints.GET_URL);
      console.log(res);
    } catch (error) {
      console.log("error");
    }
  };

  const handlredirect = (shortId) => {
    console.log("shortId",shortId);
    console.log("BASE_URL",BASE_URL)
    window.location.href = endpoints.GET_URL+ shortId;
  };
  const handlredirect2 = async (shortId) => {
    try {
      await axios.get(endpoints.GET_URL + shortId);
    } catch (error) {
      throw error;
    }
  };
  const handlredirect3 = async (shortId) => {
    try {
        const res = await axios.get(`${endpoints.GET_URL}/${shortId}`);
        const redirectUrl = res.data.redirectUrl;
        
        // Use window.location to perform the redirection
        window.location.href = redirectUrl;
    } catch (error) {
        console.error("Error during redirect: ", error);
    }
};

  return (
    <>
      <div className="  ">
        <div className="bg-white min-h-screen">
          <Header />
          <Hero />
          <form
            onSubmit={HandleSubmit}
            className="  py-8 px-8
          rounded-lg bg-hero-pattern
           bg-primary-dark-violet
           w-3/4 mx-auto
            relative
            top-20
            md:lg:right-12
           "
          >
            <div
              className="
            flex w-full 
            mx-auto 
            flex-col sm:flex-row
            gap-4
            sm:gap-8"
            >
              <input
                type="text"
                value={link}
                onChange={HandleLink}
                placeholder="Paste the link here"
                className="border border-gray-400 p-2 rounded-md w-full "
              />
              <button
                type="submit"
                className=" min-w-fit  bg-teal-300
             px-4 py-2 rounded-md"
              >
                <span className="font-extrabold text-white">Shorten It!</span>
              </button>
            </div>
          </form>
          {/* <button onClick={handleclick}>
            get urls
          </button> */}
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {data && (
          <div>
            <h3>Shortened Link:</h3>
            <p>{BASE_URL + data.shortId}</p>
            <button
              onClick={() => {
                handlredirect(data.shortId);
              }}
            >
              go to the url
            </button>
            <div>

            <a href={BASE_URL + data.shortId} target="_blank">
              go via anchor tag
            </a>
            </div>
            <button
                onClick={() => {
                  handlredirect2(data.shortId);
                }}
            >
              go via backend call
            </button>
          </div>
        )}
        <Banner />
        <Footer />
      </div>
    </>
  );
};

export default Home;
