import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function useSwipe(onSwipeLeft?: any, onSwipeRight?: any, onSwipeTop?:any, rangeOffset = 4) {

    let pageX = 0
    let pageY = 0

    // set user touch start position
    function onTouchStart(e: any) {
        pageX = e.nativeEvent.pageX
        pageY = e.nativeEvent.pageY
    }

    // when touch ends check for swipe directions
    function onTouchEnd(e: any){

        // get touch position and screen size
        const positionX = e.nativeEvent.pageX
        const positionY = e.nativeEvent.pageY
        const range = windowWidth / rangeOffset
        const rangeHeight = windowHeight / rangeOffset

        // check if position is growing positively and has reached specified range
        if(positionX - pageX > range){
            onSwipeRight && onSwipeRight()
        }
        // check if position is growing negatively and has reached specified range
        else if(pageX - positionX > range){
            onSwipeLeft && onSwipeLeft()
        }
        // swipe witch bottom
        else if (pageY - positionY > rangeHeight) {
        }
        // swipe witch top
        else if (positionY - pageY  > rangeHeight) {
            onSwipeTop && onSwipeTop()
        }
    }

    return {onTouchStart, onTouchEnd};
}