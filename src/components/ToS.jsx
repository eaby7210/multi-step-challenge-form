
import React from "react";
import useGetApi from "../apis/hooks/useGetApi";
import LoadingOverlay from "./Spinner";

export default function ToS() {
  const { data, loading, error } = useGetApi(
    `order_page/tos/latest/`,
    {},
    false,
    true
  );
  console.log(data);
 

  return (
    <div className="max-w-full">
      <section id="content" className="w-full">
        <div className="space-y-6">
          {/* Main Content Section */}
          <div className="py-3 px-4">
            {loading ? (
              <LoadingOverlay />
            ) : (
              <>
                {data ? (
                  <>
                    {" "}
                    <h3 className="text-md font-bold text-3xl text-center mt-3 px-4 text-main lg:text-nowrap">
                      {data?.title}
                    </h3>{" "}
                    <div
                      className="w-full px-4 text-gray-800"
                      id="tos"
                      dangerouslySetInnerHTML={{ __html: data?.body }}
                    ></div>
                  </>
                ) : (
                  <></>
                )}
               
              </>
            )}
             {/* <h3 className="text-md font-bold text-3xl text-center mt-3 px-4 text-main lg:text-nowrap">
                     Service Agreement
                    </h3>{" "}
                    <div
                      className="w-full px-4 text-gray-800"
                      id="tos"
                      dangerouslySetInnerHTML={{ __html: tos }}
                    ></div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
