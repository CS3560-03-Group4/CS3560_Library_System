import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      {/* Main Content Section */}
      <div className="w-full max-w-7xl grid grid-rows-[1fr_auto] gap-8 bg-white p-8 md:p-12 rounded-xl shadow-xl">
        {/* Book Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          {/* Left: Book Cover */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-sm h-full flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="/promo1.jpg" // Replace with the actual image path
                alt="Soul Screamers Cover"
                className="object-contain w-full h-auto"
              />
            </div>
          </div>

          {/* Right: Book Description */}
          <div className="flex flex-col">
            <Card className="shadow-none border-none h-full">
              <CardHeader>
                <CardTitle className="text-4xl md:text-5xl font-bold">
                  Soul Screamers 1: My Soul to Take
                </CardTitle>
                <p className="text-gray-500 mt-2 text-xl md:text-2xl">
                  by Rachel Vincent
                </p>
                <p className="text-gray-400 text-lg mt-1">Published in 2009</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed border-t border-gray-300 pt-6">
                  She doesn't see dead people, but... <br />
                  She senses when someone near her is about to die. And when
                  that happens, a force beyond her control compels her to
                  scream bloody murder. Literally. <br />
                  Kaylee just wants to enjoy having caught the attention of the
                  hottest guy in school. But a normal date is hard to come by
                  when Nash seems to know more about her need to scream than she
                  does. And when classmates start dropping dead for no apparent
                  reason, only Kaylee knows who'll be next...
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Book Information Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-300 pt-8 text-lg md:text-xl text-gray-700">
          <div>
            <p className="font-bold text-xl md:text-2xl">Publisher:</p>
            <p>Harlequin Teen</p>
          </div>
          <div>
            <p className="font-bold text-xl md:text-2xl">Print Length:</p>
            <p>288 pages</p>
          </div>
          <div>
            <p className="font-bold text-xl md:text-2xl">Genre:</p>
            <p>Fiction, Fantasy</p>
          </div>
          <div>
            <p className="font-bold text-xl md:text-2xl">Available:</p>
            <p>10 in stock</p>
          </div>
        </div>

        {/* Bottom Button Section */}
        <div className="flex justify-end gap-4 mt-4">
          <Button className="bg-[#A1EBDA] hover:bg-[#80D9C4] text-black px-8 py-3 rounded-md text-lg md:text-xl">
            Add to cart
          </Button>
          <Button className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-md text-lg md:text-xl">
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
