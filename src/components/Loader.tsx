import emblem from "../assets/img/favicon.png"
import logo from "../assets/img/brkn_logo.png"
import enterSite from "../assets/img/enter_button.svg"
import disclaimer from "../assets/img/disclaimer.svg"
import motto from "../assets/img/brkn_motto.png"

const Loader = ({ enterFn }: { enterFn: () => void }) => {
  return (
    <div className="h-dvh w-dvw bg-[#bbb] absolute top-0 left-0">
      <img
        src={emblem}
        alt="emblem"
        className="w-6 h-6 absolute top-[--edge-gap] right-[--edge-gap] animate-[spin_10s_linear_infinite]"
      />
      <img
        src={logo} alt="BRKNBRDS Logo"
        className="absolute top-[50%] left-[--edge-gap] max-w-[12vw] translate-y-[-50%]"
      />
      <button
        className="absolute top-[50%] right-[--edge-gap] cursor-pointer translate-y-[-50%] transition-[opacity] duration-[0.4s] ease-in-out hover:opacity-[0.2]"
        onClick={enterFn}
      >
        <img
          src={enterSite}
          alt="Enter Site"
          className="h-[1.5vw] w-auto"
        />
      </button>
      <img
        src={disclaimer}
        alt="BY CONTINUING TO USE THIS SITE, YOU CONSENT TO OUR USE OF ANALYTICS COOKIES."
        className="absolute bottom-[--edge-gap] left-[--edge-gap]"
      />
      <img
        src={motto}
        alt="Skateboarding Streetwear Woodworking Itutu & Lagos"
        className="absolute bottom-[--edge-gap] right-[--edge-gap] max-w-[16vw] h-auto"
      />
    </div>
  )
}

export default Loader;
