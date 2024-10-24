/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

// Define a custom type that extends the internal type declaration
interface CustomGeographiesChildrenArgument {
  outline?: any;
  borders?: any;
}

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const markers: { markerOffset: number; name: string; coordinates: [number, number] }[] = [
  { markerOffset: -20, name: 'Chicago', coordinates: [-87.6298, 41.8781] },
  { markerOffset: -20, name: 'Boston', coordinates: [-71.0589, 42.3601] },
  { markerOffset: -20, name: 'Tulsa', coordinates: [-95.9928, 36.154] },
  { markerOffset: -20, name: 'Baltimore', coordinates: [-76.6122, 39.2904] },
  { markerOffset: -20, name: 'Miami', coordinates: [-80.1918, 25.7617] },
  {
    markerOffset: 30,
    name: 'Washington, D.C.',
    coordinates: [-77.0369, 38.9072]
  },
  { markerOffset: -20, name: 'Los Angeles', coordinates: [-118.2426, 34.0549] }
];

const upArrow = '/assets/icons/arrow_up_white.svg';
const downArrow = '/assets/icons/arrow_down_white.svg';
const leftArrow = '/assets/icons/arrow_left_white.svg';
const rightArrow = '/assets/icons/arrow_right_white.svg';
const plus = '/assets/icons/plus_white.svg';
const minus = '/assets/icons/minus_white.svg';

function MapChart() {
  // const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  // function handleZoomIn() {
  //   if (position.zoom >= 4) return;
  //   setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  // }

  // function handleZoomOut() {
  //   if (position.zoom <= 1) return;
  //   setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  // }

  return (
    <div className="flex flex-col items-center  gap-3 ">
      <ComposableMap projection="geoAlbersUsa">
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {(data: any) => {
              const customData: CustomGeographiesChildrenArgument = data;
              return (
                <>
                  {customData.outline && <Geography geography={customData.outline} fill="#1C4661" />}
                  {customData.borders && <Geography geography={customData.borders} fill="none" stroke="#FFF" strokeWidth={4} />}
                </>
              );
            }}
          </Geographies>
          {markers.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates} id={name}>
              <circle r={30} fill="#1C4661" stroke="#5AB75B" strokeWidth={4} />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <div className="bg-[#22506F] text-white rounded-full flex items-center gap-8 py-4 px-8 w-max ">
        <button type="button">
          <img src={upArrow} alt="up arrow" />
        </button>
        <button type="button">
          <img src={downArrow} alt="down arrow" />
        </button>
        <button type="button">
          <img src={leftArrow} alt="left arrow" />
        </button>
        <button type="button">
          <img src={rightArrow} alt="right arrow" />
        </button>

        <button type="button" className="border-l border-[#748FA1]">
          <img src={minus} alt="minus" />
        </button>
        <span>100%</span>
        <button type="button">
          <img src={plus} alt="plus" />
        </button>
      </div>
    </div>
  );
}

export default MapChart;
