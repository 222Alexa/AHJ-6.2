import Gallery from "./Gallery";
import GalleryController from "./GalleryController";
import Popover from "./Popover";

const container = document.querySelector("#gallery-container");
const gallery = new Gallery(container);

const controller = new GalleryController(gallery);
controller.init();
