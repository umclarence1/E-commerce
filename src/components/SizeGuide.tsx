import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";

const sizeData = {
  womens: {
    title: "Women's Clothing",
    sizes: [
      { size: "XS", bust: '32"', waist: '24-25"', hips: '34-35"', uk: "6", eu: "32" },
      { size: "S", bust: '34"', waist: '26-27"', hips: '36-37"', uk: "8", eu: "34" },
      { size: "M", bust: '36"', waist: '28-29"', hips: '38-39"', uk: "10", eu: "36" },
      { size: "L", bust: '38"', waist: '30-31"', hips: '40-41"', uk: "12", eu: "38" },
      { size: "XL", bust: '40"', waist: '32-33"', hips: '42-43"', uk: "14", eu: "40" },
    ],
  },
  mens: {
    title: "Men's Clothing",
    sizes: [
      { size: "S", chest: '36-38"', waist: '28-30"', hips: '36-38"', uk: "36", eu: "46" },
      { size: "M", chest: '38-40"', waist: '30-32"', hips: '38-40"', uk: "38", eu: "48" },
      { size: "L", chest: '40-42"', waist: '32-34"', hips: '40-42"', uk: "40", eu: "50" },
      { size: "XL", chest: '42-44"', waist: '34-36"', hips: '42-44"', uk: "42", eu: "52" },
      { size: "XXL", chest: '44-46"', waist: '36-38"', hips: '44-46"', uk: "44", eu: "54" },
    ],
  },
  footwear: {
    title: "Footwear",
    sizes: [
      { eu: "36", uk: "3", us: "5.5", cm: "22.5" },
      { eu: "37", uk: "4", us: "6.5", cm: "23.5" },
      { eu: "38", uk: "5", us: "7.5", cm: "24" },
      { eu: "39", uk: "6", us: "8.5", cm: "25" },
      { eu: "40", uk: "7", us: "9.5", cm: "25.5" },
      { eu: "41", uk: "8", us: "10.5", cm: "26.5" },
      { eu: "42", uk: "9", us: "11.5", cm: "27" },
      { eu: "43", uk: "10", us: "12", cm: "28" },
      { eu: "44", uk: "11", us: "13", cm: "29" },
    ],
  },
};

interface SizeGuideProps {
  trigger?: React.ReactNode;
  category?: "womens" | "mens" | "footwear";
}

const SizeGuide = ({ trigger, category = "womens" }: SizeGuideProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="text-amber-500 hover:text-amber-400 p-0 h-auto">
            <Ruler className="w-4 h-4 mr-1" />
            Size Guide
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Size Guide</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 mt-4">
          {/* How to Measure */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-serif text-lg font-medium mb-4">How to Measure</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-amber-500 mb-1">Bust/Chest</p>
                <p className="text-muted-foreground">Measure around the fullest part of your chest</p>
              </div>
              <div>
                <p className="font-medium text-amber-500 mb-1">Waist</p>
                <p className="text-muted-foreground">Measure around your natural waistline</p>
              </div>
              <div>
                <p className="font-medium text-amber-500 mb-1">Hips</p>
                <p className="text-muted-foreground">Measure around the fullest part of your hips</p>
              </div>
            </div>
          </div>

          {/* Women's Sizes */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">{sizeData.womens.title}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">Size</th>
                    <th className="text-left py-3 px-4 font-medium">Bust</th>
                    <th className="text-left py-3 px-4 font-medium">Waist</th>
                    <th className="text-left py-3 px-4 font-medium">Hips</th>
                    <th className="text-left py-3 px-4 font-medium">UK</th>
                    <th className="text-left py-3 px-4 font-medium">EU</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.womens.sizes.map((row, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 font-medium text-amber-500">{row.size}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.bust}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.waist}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.hips}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.uk}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.eu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Men's Sizes */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">{sizeData.mens.title}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">Size</th>
                    <th className="text-left py-3 px-4 font-medium">Chest</th>
                    <th className="text-left py-3 px-4 font-medium">Waist</th>
                    <th className="text-left py-3 px-4 font-medium">Hips</th>
                    <th className="text-left py-3 px-4 font-medium">UK</th>
                    <th className="text-left py-3 px-4 font-medium">EU</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.mens.sizes.map((row, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 font-medium text-amber-500">{row.size}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.chest}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.waist}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.hips}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.uk}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.eu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footwear Sizes */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">{sizeData.footwear.title}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">EU</th>
                    <th className="text-left py-3 px-4 font-medium">UK</th>
                    <th className="text-left py-3 px-4 font-medium">US</th>
                    <th className="text-left py-3 px-4 font-medium">CM</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.footwear.sizes.map((row, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 font-medium text-amber-500">{row.eu}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.uk}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.us}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips */}
          <div className="glass-gold rounded-xl p-6">
            <h3 className="font-serif text-lg font-medium mb-3">Sizing Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• When between sizes, size up for a relaxed fit or size down for a tailored look</li>
              <li>• Measurements may vary slightly between different styles</li>
              <li>• For footwear, consider sizing up if you have wide feet</li>
              <li>• Contact our team for personalized sizing assistance</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuide;
