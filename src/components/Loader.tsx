import emblem from "../assets/img/favicon.png"
import logo from "../assets/img/brkn_logo.png"
import enterSite from "../assets/img/enter_button.svg"
import disclaimer from "../assets/img/disclaimer.svg"
import motto from "../assets/img/brkn_motto.png"

const Loader = ({ enterFn }: { enterFn: () => void }) => {
  return (
    <div className="h-dvh w-dvw bg-[#bbb] absolute top-0 left-0 flex flex-col justify-center items-center">
      <img
        src={emblem}
        alt="emblem"
        className="h-8 w-auto absolute top-[--edge-gap] right-[--edge-gap] animate-[spin_10s_linear_infinite]"
      />
      <img
        src={motto}
        alt="Skateboarding Streetwear Woodworking Itutu & Lagos"
        className="mb-6 w-[64vw] h-auto sm:x-[max-w-[16vw],mb-0,absolute,bottom-[--edge-gap],right-[--edge-gap]]"
      />
      <img
        src={logo} alt="BRKNBRDS Logo"
        className="w-[20vw] mb-8 sm:x-[max-w-[12vw],absolute,top-[50%],left-[--edge-gap],translate-y-[-50%]]"
      />
      <button
        className="cursor-pointer transition-[opacity] duration-[0.4s] ease-in-out hover:opacity-[0.2] sm:x-[absolute,top-[50%],right-[--edge-gap],translate-y-[-50%]]"
        onClick={enterFn}
      >
        <img
          src={enterSite}
          alt="Enter Site"
          className="w-[16vw] h-auto sm:x-[h-[1.5vw],w-auto]"
        />
      </button>
      <img
        src={disclaimer}
        alt="BY CONTINUING TO USE THIS SITE, YOU CONSENT TO OUR USE OF ANALYTICS COOKIES."
        className="h-[2vh] px-[--edge-gap] absolute bottom-[--edge-gap] left-[50%] translate-x-[-50%] sm:x-[h-auto,px-0,left-[--edge-gap],translate-x-[0]]"
      />
    </div>
  )
}

export default Loader;
