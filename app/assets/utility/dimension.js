import { AppState, Dimensions, PixelRatio, Platform } from "react-native";

export default function px(pixel) {
    const scale = Dimensions.get("window").width / 375;
    const newSize = pixel * scale;
    let result = Math.round(PixelRatio.roundToNearestPixel(newSize));
    result =  Platform.OS==="ios"? result : result - 2;
    return pixel > 0 && result <= 0 ? 1 : result;
  }