import logoDrywall from "../assets/dry-logo.svg";
import electricalLogo from "../assets/electricalLogo.svg";
import paintingLogo from "../assets/paintingLogo.svg";
import carpentryLogo from "../assets/carp-logo.svg";
import plumbingLogo from "../assets/plumbingLogo.svg";
import utilitysLogo from "../assets/utilitysLogo.svg";
import picDrywall from "../assets/dry-wall.jpeg";
import electricalPic from "../assets/electrician.jpeg";
import paintingPic from "../assets/painters.jpeg";
import carpentryPic from "../assets/carpenters.png";
import plumbingPic from "../assets/plumbing.jpeg";
import utilitysPic from "../assets/utiles.png";

export const services = [
  {
    title: "Drywall",
    desc: "Quality ceiling installations, drywall, and partitions services.",
    logo: logoDrywall,
    bigDesc:
      "Drywall work involves installing, finishing, and repairing interior walls and ceilings using gypsum boards for construction.",
    pic: picDrywall,
    side: "l",
  },
  {
    title: "Electrical",
    desc: "House electrical installation: wiring and fixture setup.",
    logo: electricalLogo,
    bigDesc:
      "We insdfhlashdflhsklhfahdlfhkalshdgklhasdkljfghaskdhfkashdklfhasdkfhaskljdhfklashdfashdlfhasdhfstall, maintain, and repair electrical systems, ensuring safe and efficient power distribution in residential and commercial settings.", //poner buildings?
    pic: electricalPic,
    side: "r",
  },
  {
    title: "Painting",
    desc: "Professional painting for homes, spaces, or businesses.",
    logo: paintingLogo,
    bigDesc:
      "We prepare surfaces and apply paint on all types of materials and structures to enhance appearance and protect surfaces from damage.",
    pic: paintingPic,
    side: "l",
  },
  {
    title: "Carpentry",
    desc: "Carpenter specializing in custom woodwork and renovations.",
    logo: carpentryLogo,
    bigDesc:
      "We construct, install, and repair structures and fixtures made from wood and other materials, ensuring precision and quality in our craftsmanship.",
    pic: carpentryPic,
    side: "r",
  },
  {
    title: "Plumbing",
    desc: "Installation and maintenance of plumbing and water systems.",
    logo: plumbingLogo,
    bigDesc:
      "We install and repair pipes, fixtures, and plumbing systems to ensure proper water distribution, drainage, and sanitation in buildings.",
    pic: plumbingPic,
    side: "l",
  },
  {
    title: "Utilities",
    desc: "Common premises maintenance and repairs.",
    logo: utilitysLogo,
    bigDesc:
      "We repair and maintain various services commonly needed in houses, buildings, and offices.",
    pic: utilitysPic,
    side: "r",
  },
];
