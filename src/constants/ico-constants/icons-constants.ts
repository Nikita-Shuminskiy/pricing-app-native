import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const iconsEnum = {
	CHECK: {
		type: 'material',
		name: 'check',
	},
	PLAY: {
		type: 'ionicons',
		name: 'ios-play',
	},
	PAUSE: {
		type: 'ionicons',
		name: 'ios-pause',
	},
	THUMBS_UP: {
		type: 'antdesign',
		name: 'like1',
	},
	THUMBS_DOWN: {
		type: 'antdesign',
		name: 'dislike1',
	},
	CHEVRON_DOWN: {
		type: 'material',
		name: 'chevron-down',
	},
	DOTS_VERTICAL: {
		type: 'material',
		name: 'dots-vertical',
	},
	LOCATION_PIN: {
		type: 'simpleLine',
		name: 'location-pin',
	},
	SHARE: {
		type: 'ionicons',
		name: 'md-share',
	},
	EMAIL: {
		type: 'material',
		name: 'email',
	},
	HEART: {
		type: 'material',
		name: 'heart-outline',
	},
	FULL_HEART: {
		type: 'material',
		name: 'heart',
	},
	BOOKMARK: {
		type: 'material',
		name: 'bookmark',
	},
	BOOKMARK_OUTLINE: {
		type: 'material',
		name: 'bookmark-outline',
	},
	COMPASS: {
		type: 'material',
		name: 'compass-outline',
	},
	ARROW_RIGHT: {
		type: 'material',
		name: 'arrow-right',
	},
	ARROW_LEFT: {
		type: 'material',
		name: 'arrow-left',
	},
	LOCK_OPEN: {
		type: 'material',
		name: 'lock-open',
	},
	POWER_STANDBY: {
		type: 'material',
		name: 'power-standby',
	},
	HAMBURGER: {
		type: 'ionicons',
		name: 'md-menu',
	},
	CLOSE: {
		type: 'material',
		name: 'close',
	},
	EYE: {
		type: 'material',
		name: 'eye',
	},
	FLAG_CHECKERED: {
		type: 'material',
		name: 'flag-checkered',
	},
	PENCIL: {
		type: 'material',
		name: 'pencil',
	},
	IMAGES: {
		type: 'ionicons',
		name: 'md-images',
	},
	CAMERA: {
		type: 'simpleLine',
		name: 'camera',
	},
	WARNING: {
		type: 'ionicons',
		name: 'ios-warning',
	},
	CHEVRON_RIGHT: {
		type: 'material',
		name: 'chevron-right',
	},
	CLOCK_OUTLINE: {
		type: 'material',
		name: 'clock-outline',
	},
	CALENDAR_BLANK: {
		type: 'material',
		name: 'calendar-blank',
	},
	PERSON: {
		type: 'ionicons',
		name: 'md-person',
	},
	TUNE: {
		type: 'material',
		name: 'tune',
	},
	GLOBE: {
		type: 'ionicons',
		name: 'md-globe',
	},
	HOURGLASS_EMPTY: {
		type: 'ionicons',
		name: 'md-hourglass',
	},
	BULB_OUTLINE: {
		type: 'material',
		name: 'lightbulb-on-outline',
	},
	PHONE: {
		type: 'simpleLine',
		name: 'phone',
	},
	INFO_CIRCLE_OUTLINED: {
		type: 'ionicons',
		name: 'ios-information-circle-outline',
	},
	LOCK: {
		type: 'material',
		name: 'lock-outline',
	},
	GLOBE_NET: {
		type: 'ionicons',
		name: 'ios-globe',
	},
	CUBE: {
		type: 'material',
		name: 'cube-outline',
	},
	QUESTION_CIRCLE_OUTLINED: {
		type: 'simpleLine',
		name: 'question',
	},
	FLASH: {
		type: 'ionicons',
		name: 'ios-flash',
	},
	PENDING: {
		type: 'svg',
		name: 'PENDING',
	},
	MATCH: {
		type: 'svg',
		name: 'MATCH',
	},
	DECLINED: {
		type: 'svg',
		name: 'DECLINED',
	},
	CLOSED: {
		type: 'svg',
		name: 'CLOSED',
	},
	GLOAT_HELP: {
		type: 'materialIcon',
		name: 'help-outline',
	},
	GLOAT_LOCK_OPEN: {
		type: 'materialIcon',
		name: 'lock-open',
	},
	ENDED: {
		type: 'svg',
		name: 'ENDED',
	},
	REMOVE: {
		type: 'material',
		name: 'minus-circle-outline',
	},
	INSERT_CHART: {
		type: 'svg',
		name: 'insert_chart',
	},
	BOOKMARK_MINUS_OUTLINE: {
		type: 'material',
		name: 'bookmark-minus-outline',
	},
	LINK: {
		type: 'material',
		name: 'link',
	},
	GRADUATION: {
		type: 'simpleLine',
		name: 'graduation',
	},
	DIRECTIONS: {
		type: 'material',
		name: 'directions',
	},
	BULLSEYE_ARROW: {
		type: 'material',
		name: 'bullseye-arrow',
	},
	BRIEFCASE_OUTLINE: {
		type: 'material',
		name: 'briefcase-outline',
	},
	TROPHY_OUTLINE: {
		type: 'ionicons',
		name: 'trophy-outline',
	},
	LAYERS_OUTLINE: {
		type: 'material',
		name: 'layers-outline',
	},
	SEARCH: {
		type: 'materialIcon',
		name: 'search',
	},
	SETTINGS: {
		type: 'ionicons',
		name: 'settings-outline',
	},
	WORK_OUTLINE: {
		type: 'materialIcon',
		name: 'work-outline',
	},
	ASSISTANT_DIRECTION: {
		type: 'materialIcon',
		name: 'assistant-direction',
	},
	CREATE: {
		type: 'materialIcon',
		name: 'create',
	},
	CHECK_CIRCLE_OUTLINE: {
		type: 'materialIcon',
		name: 'check-circle-outline',
	},
	WALLET: {
		type: 'antdesign',
		name: 'wallet',
	},
	WALLET_OUTLINE: {
		type: 'ionicons',
		name: 'wallet-outline',
	},
	TABLE: {
		type: 'antdesign',
		name: 'table',
	},
	CHART: {
		type: 'ionicons',
		name: 'bar-chart',
	},
};

const types = {
	material: MaterialCommunityIcons,
	ionicons: Ionicons,
	simpleLine: SimpleLineIcons,
	antdesign: AntDesign,
	materialIcon: MaterialIcons,
};

export type IconKeys = keyof typeof iconsEnum;
export type iconTypes = keyof typeof types;

export { types };
export default iconsEnum;
