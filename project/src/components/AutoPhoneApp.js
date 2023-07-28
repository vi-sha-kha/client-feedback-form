import React, { useState } from "react";
import CountryData from "./CountryData.json";
import { v4 as uuidv4 } from "uuid";

const AutoPhoneApp = () => {
  const [countries, setCountries] = useState(CountryData);
  console.log("countries", countries);

  const [searchCode, setSearchCode] = useState();
  console.log("searchCode", searchCode);

  const searchCountry = countries.find((obj) => {
    if (obj.code === searchCode) {
      return true;
    }
    return false;
  });
  console.log("searchCountry", searchCountry);
  return (
    <React.Fragment>
      <section>
        <div className="bg-white w-auto h-96 mx-5 mt-40 rounded-lg sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto ">
          {/* header section */}
          <div className="h-28 flex justify-center items-center shadow">
            <p className="uppercase font-bold text-4xl text-center">
              Select Country / <br />
              auto phone code
            </p>
          </div>

          {/* body section */}
          <div>
            <div className=" mt-14 mx-10">
              <div>
                <select
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className=" w-full h-14 text-xl rounded-lg"
                >
                  <option value="" hidden>
                    --Select Country--
                  </option>
                  {countries.map((item) => {
                    return (
                      <option key={uuidv4()} value={item.code}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="w-full mt-5 grid grid-cols-3 gap-2">
                <input
                  value={(searchCountry && searchCountry.dial_code) || ""}
                  type="tel"
                  placeholder="Code"
                  className="w-full h-14 text-xl rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full h-14 text-xl rounded-lg col-span-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AutoPhoneApp;
