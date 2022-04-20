import styled from "styled-components";
import {
  motion,
  useAnimation,
  AnimatePresence,
  useViewportScroll,
} from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const setSearchHandler = () => {
    if (openSearch) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setOpenSearch((prev) => !prev);
  };

  const homeRoute = useMatch("/");
  const tvRoute = useMatch("tv");
  console.log(homeRoute);
  console.log(tvRoute);
  useEffect(() => {
    scrollY.onChange(() => {
      console.log(scrollY.get());
      if (scrollY.get() >= 50) {
        navAnimation.start("action");
      } else {
        navAnimation.start("normal");
      }
    });
  }, [scrollY, navAnimation, homeRoute, tvRoute]);
  return (
    <Nav variants={navVariant} animate={navAnimation} initial="normal">
      <Col>
        <Logo
          variants={mainLogoVariant}
          initial="normal"
          whileHover="action"
          xmlns="http://www.w3.org/2000/svg"
          width={150}
          fill="#E73118"
          viewBox="0 0 153.51 41.23"
          enableBackground="new 0 0 153.51 41.23"
        >
          <g>
            <g>
              <motion.path
                fill="#E73118"
                d="M6.05,5.01h18.98v5.59H13.08v8.53h9.21v5.59h-9.21v12.9H6.05V5.01z"
              />
              <motion.path
                fill="#E73118"
                d="M27.3,5.01h7.03v26.5h10.31v6.12H27.3V5.01z"
              />
              <motion.path
                fill="#E73118"
                d="M47.74,5.01h7.03v32.62h-7.03V5.01z"
              />
              <motion.path
                fill="#E73118"
                d="M58.03,5.01h7.85l3.8,8.46l4.02-8.46h6.74l-7.55,14.75l8.53,17.86h-7.71L69.04,27l-5.24,10.63h-6.74
			l8.79-16.71L58.03,5.01z"
              />
              <motion.path
                fill="#E73118"
                d="M83.46,5.01h7.8l8.23,20.26V5.01h5.44v32.62h-6.28L88.9,14.02v23.61h-5.44V5.01z"
              />
              <motion.path
                fill="#E73118"
                d="M110.7,5.01h19.45v5.59h-12.42v7.58h9.66v5.59h-9.66v8.03h12.42v5.83H110.7V5.01z"
              />
              <motion.path
                fill="#E73118"
                d="M130.01,5.01h19.95v6.12h-6.54v26.5h-7.03v-26.5h-6.38V5.01z"
              />
            </g>
          </g>
        </Logo>

        <Items>
          <Link to={"/"}>
            <Item
              variants={itemBtnVariant}
              whileHover="action"
              initial="normal"
              route={Boolean(homeRoute) + ""}
            >
              Home
              <AnimatePresence>
                {homeRoute && (
                  <UnderBar
                    layoutId="underbar"
                    variants={underBarVariant}
                    initial="normal"
                    animate="action"
                    exit="exit"
                  />
                )}
              </AnimatePresence>
            </Item>
          </Link>
          <Link to={"tv"}>
            <Item
              variants={itemBtnVariant}
              whileHover="action"
              initial="normal"
              route={Boolean(tvRoute) + ""}
            >
              Tv Shows
              <AnimatePresence>
                {tvRoute && (
                  <UnderBar
                    layoutId="underbar"
                    variants={underBarVariant}
                    initial="normal"
                    animate="action"
                    exit="exit"
                  />
                )}
              </AnimatePresence>
            </Item>
          </Link>
        </Items>
      </Col>
      <Col>
        <Search>
          <SearchSvg
            onClick={setSearchHandler}
            variants={searchLogoVariant}
            animate={openSearch ? "action" : ""}
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            viewBox="0 0 128 128"
            width="26px"
            height="26px"
          >
            <path d="M 56.599609 21.599609 C 34.099609 21.599609 15.800781 40.100781 15.800781 62.800781 C 15.800781 85.600781 34.099609 104 56.599609 104 C 66.899609 104 76.3 100.09922 83.5 93.699219 L 85.800781 96 L 83.699219 98.199219 C 82.499219 99.399219 82.499219 101.3 83.699219 102.5 L 101.69922 120.69922 C 102.29922 121.29922 103.00078 121.59961 103.80078 121.59961 C 104.60078 121.59961 105.40039 121.29922 105.90039 120.69922 L 113.90039 112.59961 C 115.00039 111.39961 115.00078 109.50039 113.80078 108.40039 L 95.800781 90.199219 C 95.200781 89.599219 94.499219 89.300781 93.699219 89.300781 C 92.899219 89.300781 92.099609 89.599219 91.599609 90.199219 L 89.5 92.400391 L 87.199219 90 C 93.499219 82.7 97.400391 73.200781 97.400391 62.800781 C 97.400391 40.100781 79.099609 21.599609 56.599609 21.599609 z M 56.599609 27.699219 C 75.799609 27.699219 91.400391 43.500391 91.400391 62.900391 C 91.400391 82.300391 75.799609 98 56.599609 98 C 37.399609 98 21.800781 82.300391 21.800781 62.900391 C 21.800781 43.500391 37.399609 27.699219 56.599609 27.699219 z M 56.699219 40.199219 C 47.199219 40.199219 38.7 46.300781 35.5 55.300781 C 35 56.600781 35.699609 58.199609 37.099609 58.599609 C 37.399609 58.699609 37.7 58.800781 38 58.800781 C 39.1 58.800781 40.1 58.1 40.5 57 C 42.9 50.1 49.499219 45.400391 56.699219 45.400391 C 58.099219 45.400391 59.300781 44.200781 59.300781 42.800781 C 59.300781 41.400781 58.099219 40.199219 56.699219 40.199219 z M 37.699219 64.900391 C 36.299219 64.900391 35.099609 66 35.099609 67.5 L 35.099609 67.900391 C 35.199609 69.300391 36.300781 70.5 37.800781 70.5 C 39.200781 70.5 40.400391 69.300391 40.400391 67.900391 L 40.400391 67.599609 C 40.400391 66.099609 39.300781 64.900391 37.800781 64.900391 L 37.699219 64.900391 z M 93.800781 96.599609 L 107.59961 110.59961 L 103.80078 114.40039 L 90 100.40039 L 93.800781 96.599609 z" />
          </SearchSvg>
          <Input
            animate={inputAnimation}
            placeholder="Search for movie or tv show"
            variants={searchInputVariant}
            initial="normal"
            transition={{ type: "linear" }}
          />
        </Search>
      </Col>
    </Nav>
  );
}
const navVariant = {
  normal: {
    backgroundImage: "linear-gradient(rgba(0,0,0, .5), rgba(0,0,0,.01))",
  },
  action: {
    backgroundImage: "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))",
  },
};
const mainLogoVariant = {
  normal: {
    fillOpacity: 1,
  },
  action: {
    fillOpacity: [1, 0, 1],
    scale: 1.1,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};
const itemBtnVariant = {
  normal: {
    scale: 1,
  },
  action: {
    scale: 1.2,
  },
};
const underBarVariant = {
  normal: {
    width: "0px",
    opacity: 0,
  },
  action: {
    opacity: 1,
    width: "25px",
    height: "2px",
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    width: 0,
    opacity: 0,
  },
};
const searchLogoVariant = {
  normal: {},
  action: {
    x: -225,
    transition: {
      type: "linear",
    },
  },
};
const searchInputVariant = {
  normal: {
    scaleX: 0,
    transition: {
      type: "linear",
    },
  },
  action: {
    scaleX: 1,
    transition: {
      type: "linear",
    },
  },
};

const Nav = styled(motion.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  color: white;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 20px 60px;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled(motion.svg)`
  margin-right: 50px;
  path {
    stroke-width: 0.5px;
    stroke: white;
  }
`;
const Items = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;
const Item = styled(motion.li)<{ route: boolean | string }>`
  position: relative;
  margin-right: 20px;
  display: flex;
  justify-content: center;
`;
const UnderBar = styled(motion.div)`
  position: absolute;
  background-color: white;
  width: 15px;
  height: 1px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;
const Search = styled.span`
  display: flex;
  align-items: center;
  position: relative;
`;
const SearchSvg = styled(motion.svg)``;
const Input = styled(motion.input)`
  z-index: -1;
  transform-origin: right;
  position: absolute;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
  color: white;
  padding: 10px 30px;
  left: -230px;
`;

export default Header;
/* align-items: center; */
/* flex-direction: column; */
/* border-width: ${(props) => (props.route ? "0 0 1px 0" : null)};
  border-style: ${(props) => (props.route ? "solid" : null)};
  border-color: ${(props) => (props.route ? "white" : null)}; */
