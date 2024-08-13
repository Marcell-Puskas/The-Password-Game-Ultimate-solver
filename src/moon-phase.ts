import { getMoonIllumination } from "suncalc";
import { DateTime } from "luxon";

export function getMoonEmoji() {
    var startOfDay = DateTime.now().setZone('America/New_York').startOf('day').toJSDate();
    var endOfDay = DateTime.now().setZone('America/New_York').startOf('day').plus({
        days: 1
    }).toJSDate();

    var startOfDayPhase = getMoonIllumination(startOfDay).phase,
        endOfDayPhase = getMoonIllumination(endOfDay).phase;
    var emojis = (startOfDayPhase <= 0.25 && endOfDayPhase >= 0.25
        ? ["🌓", "🌗", "🌛", "🌜"]
        : startOfDayPhase <= 0.5 && endOfDayPhase >= 0.5
        ? ["🌕", "🌝"]
        : startOfDayPhase <= 0.75 && endOfDayPhase >= 0.75
        ? ["🌓", "🌗", "🌛", "🌜"]
        : startOfDayPhase >= endOfDayPhase
        ? ["🌑", "🌚"]
        : startOfDayPhase <= 0.25
        ? ["🌒", "🌘"]
        : startOfDayPhase <= 0.5 || startOfDayPhase <= 0.75
        ? ["🌔", "🌖"]
        : ["🌒", "🌘"]
    );
    
    return emojis[0]
}