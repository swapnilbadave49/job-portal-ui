import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

export default function Img({ img }) {
	const cld = new Cloudinary({
		cloud: {
			cloudName: "daerbcrhx",
		},
	});

	const myImage = cld.image(img);
	return <AdvancedImage cldImg={myImage} />;
}