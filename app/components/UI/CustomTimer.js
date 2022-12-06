import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react';

const CustomTimer = ({initialMinutes,initialSeconds,onFinish}) => {
    
    const [ minutes, setMinutes ] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    onFinish(true)
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return () => {
            clearInterval(myInterval);
          };
    });

    return (
        <View>
        { minutes === 0 && seconds === 0
            ? null
            : <Text style={styles.text}> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</Text> 
        }
        </View>
    )
}

export default CustomTimer;

const styles = StyleSheet.create({
    text:{ fontWeight: '700', fontSize: 15, color: '#0C1A30' }
})