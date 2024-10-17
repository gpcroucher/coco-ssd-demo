import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { FormEvent, useState } from "react";
import BoundingBox from "./components/BoundingBox";

export default function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [bboxes, setBboxes] = useState([[0, 0, 0, 0]]);
  const [guesses, setGuesses] = useState([""]);

  async function classifyImage(url: string) {
    console.log(url);
    const img = document.createElement("img");
    img.src = url;
    img.crossOrigin = "anonymous"; // required for openGL
    const model = await cocoSsd.load();
    const predictions = await model.detect(img, 5);
    setBboxes(
      predictions.map((prediction) => {
        return prediction.bbox;
      })
    );
    setGuesses(
      predictions.map((prediction) => {
        return prediction.class;
      })
    );
    console.log("Predictions:", predictions);
    model.dispose();
  }

  function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const url = formData.get("url") as string;

    setImageUrl(url);
    classifyImage(url);
  }

  return (
    <div className="flex p-4">
      <form onSubmit={handleForm} autoComplete="off">
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="urlInput">
            Image URL:{" "}
          </label>
          <input
            className="w-96 bg-slate-100 border-2 border-slate-300"
            type="text"
            name="url"
            id="urlInput"
          />
        </div>

        <button className="border-2 rounded-sm m-2" type="submit">
          What's in this image?
        </button>
      </form>

      {imageUrl ? (
        <div className="relative m-4">
          <img className="" src={imageUrl} alt="" />
          {bboxes.length > 0 ? (
            <BoundingBox bbox={bboxes[0]} guess={guesses[0]} />
          ) : (
            <></>
          )}
          {bboxes.length > 1 ? (
            <BoundingBox bbox={bboxes[1]} guess={guesses[1]} />
          ) : (
            <></>
          )}
          {bboxes.length > 2 ? (
            <BoundingBox bbox={bboxes[2]} guess={guesses[2]} />
          ) : (
            <></>
          )}
          {bboxes.length > 3 ? (
            <BoundingBox bbox={bboxes[3]} guess={guesses[3]} />
          ) : (
            <></>
          )}
          {bboxes.length > 4 ? (
            <BoundingBox bbox={bboxes[4]} guess={guesses[4]} />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
