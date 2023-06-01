import headLogo from "./assets/Images/headLogo.svg";
import cross from "./assets/Images/cross.svg";
import whiteLogo from "./assets/Images/whiteLogo.svg";
import submenuarrow from "./assets/Images/submenu-arrow.svg";
import downArrow from "./assets/Images/downArrow.svg";
import downArrowWhite from "./assets/Images/downArrowWhite.svg";
import search from "./assets/Images/search.svg";
import "./responsive.css";

import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [data, setData] = useState();
  const [mouseHover, setMouseHover] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [subInnerMenu, setSubInnerMenu] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://staging.reviv-backend.wearedigitl.com/api/navigation/?populate%5BmainMenu%5D%5Bpopulate%5D%5B0%5D=page&populate%5BmainMenu%5D%5Bpopulate%5D%5B1%5D=products&populate%5BmainMenu%5D%5Bpopulate%5D%5B2%5D=nutrients&populate%5BmainMenu%5D%5Bpopulate%5D%5Bpage%5D%5Bfields%5D%5B0%5D%5B1%5D=title%2Cslug&populate%5BmainMenu%5D%5Bpopulate%5D%5Bproducts%5D%5Bpopulate%5D%5Bcategory%5D%5Bfields%5D=name&populate%5BmainMenu%5D%5Bpopulate%5D%5Bproducts%5D%5Bfields%5D%5B0%5D%5B1%5D=title%2Cslug%2Cspecification&populate%5BmainMenu%5D%5Bpopulate%5D%5Bnutrients%5D%5Bfields%5D%5B0%5D%5B1%5D=title"
      );
      if (response) {
        setData(response.data);
      }
    };
    fetchData();
  }, []);

  const handleHover = (obj) => {
    if (obj === "IV/IM Products") setMouseHover(true);
  };
  const handleLeave = () => {
    setMouseHover(false);
  };

  const navigate = useNavigate();
  console.log(data);
  return (
    <>
      <div className="desktopHeader">
        <div className={mouseHover ? "header-root bg-header" : "header-root"}>
          <div className="header-grid">
            <div className="header-logo">
              <img src={mouseHover ? whiteLogo : headLogo} alt="headLogo" />
            </div>
            <div className="menu-list">
              <ul>
                {data?.data?.attributes?.mainMenu?.map((obj) => (
                  <li
                    className={
                      obj?.linkText === "IV/IM Products" || "Nutrients"
                        ? "hover-effect"
                        : ""
                    }
                    onMouseEnter={() => handleHover(obj?.linkText)}
                    onMouseLeave={handleLeave}
                  >
                    <Link
                      to={obj?.page ? obj?.page?.data?.attributes?.slug : "#"}
                    >
                      {" "}
                      {obj?.linkText}{" "}
                      {obj?.products?.data?.length > 0 && (
                        <img
                          src={mouseHover ? downArrowWhite : downArrow}
                          alt="down"
                        />
                      )}
                      {obj?.nutrients?.data?.length > 0 && (
                        <img
                          src={mouseHover ? downArrowWhite : downArrow}
                          alt="down"
                        />
                      )}
                    </Link>

                    {obj?.products?.data?.length > 0 && (
                      <div className="submenu-root">
                        {
                          obj?.products?.data?.map((obj) => (
                            <h5>
                              {" "}
                              {
                                obj?.attributes?.category?.data?.attributes
                                  ?.name
                              }{" "}
                            </h5>
                          ))[0]
                        }

                        <div className="sub-menu">
                          {obj?.products?.data?.map((obj) => (
                            <>
                              <div
                                className="inner-tab-root"
                                onClick={() =>
                                  navigate(`/${obj?.attributes?.slug}`)
                                }
                              >
                                <div>
                                  <Link to={obj?.attributes?.slug}>
                                    {obj?.attributes?.title}{" "}
                                  </Link>
                                  <p>{obj?.attributes?.specification}</p>
                                </div>
                                <img src={submenuarrow} alt="submenuarrow" />
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    )}

                    {obj?.nutrients?.data?.length > 0 && (
                      <div className="subMenu2">
                        {obj?.nutrients?.data?.map((nt) => (
                          <Link
                            to={nt.attributes.title}
                            className="nutrie-link"
                          >
                            {nt.attributes.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
                <li>
                  <img src={search} alt="search" />
                </li>
              </ul>
            </div>
            <div className="book-now-btn">
              <a href="">Book Now</a>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-nav">
        <div>
          <div className="mobile-menubar-root">
            <img src={headLogo} alt="headlogo" />
            <div onClick={() => setMobileMenu(!mobileMenu)}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
        {mobileMenu && (
          <>
            <div className="mobile-header">
              <div className="mobile-header-grid">
                <div className="mobile-submenu">
                  <div className="cross-btn-root">
                    <img src={whiteLogo} alt="headlogo" />
                    <div
                      onClick={() => {
                        setMobileMenu(!mobileMenu);
                        // subInnerMenu(null);
                      }}
                    >
                      <img src={cross} alt="cross" />
                    </div>
                  </div>
                  {!subInnerMenu && (
                    <div className="book-now-root">
                      <p>Begin your life without limits.</p>
                      <p className="small-p">
                        Book your treatment today at one of your local clinics
                        and start achieving your health goals.
                      </p>
                      <a href="" className="booknow-btn">
                        Book Now
                      </a>
                    </div>
                  )}
                  {!subInnerMenu && (
                    <ul>
                      {data?.data?.attributes?.mainMenu?.map((obj) => (
                        <li
                          className={
                            obj?.linkText === "IV/IM Products" || "Nutrients"
                              ? "hover-effect"
                              : ""
                          }
                          onClick={() => {
                            if (obj?.linkText === "IV/IM Products") {
                              setSubInnerMenu(obj?.products?.data);
                            }
                          }}
                        >
                          <Link
                            to={
                              obj?.page
                                ? obj?.page?.data?.attributes?.slug
                                : "#"
                            }
                          >
                            {" "}
                            {obj?.linkText}{" "}
                          </Link>
                          {obj?.products?.data?.length > 0 && (
                            <div>
                              <img src={submenuarrow} alt="submenuarrow" />
                            </div>
                          )}
                          {obj?.nutrients?.data?.length > 0 && (
                            <div>
                              <img src={submenuarrow} alt="submenuarrow" />
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {subInnerMenu?.length > 0 && (
                    <>
                      <div
                        onClick={() => setSubInnerMenu("")}
                        className="innerlink-root"
                      >
                        <p className="linkinner">{`<`} IV / IM Products</p>
                      </div>
                      <div className="inner-menu">
                        {
                          subInnerMenu?.map((obj) => (
                            <p className="subText">
                              {obj?.attributes?.category?.data?.attributes.name}
                            </p>
                          ))[0]
                        }
                        {subInnerMenu?.map((obj) => (
                          <>
                            <div
                              className="sub-div"
                              onClick={() =>
                                navigate(`/${obj?.attributes?.slug}`)
                              }
                            >
                              <div>
                                <Link to={obj?.attributes?.slug}>
                                  {obj?.attributes?.title}
                                </Link>
                                <p>{obj?.attributes?.specification}</p>
                              </div>
                              <div>
                                <img src={submenuarrow} alt="submenuarrow" />
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
