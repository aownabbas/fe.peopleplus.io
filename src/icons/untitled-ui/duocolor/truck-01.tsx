import type { SVGProps } from 'react'

const Truck01 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		{...props}
	>
		<path
			fill="currentColor"
			d="M5.2 4h5.6c1.1201 0 1.6802 0 2.108.218.3763.1917.6823.4977.874.874C14 5.5198 14 6.08 14 7.2V17h-4c0-1.6569-1.3431-3-3-3-1.6505 0-2.9896 1.3328-3 2.9808-.3922-.0239-.6705-.0778-.908-.1988a1.9997 1.9997 0 0 1-.874-.874C2 15.4802 2 14.9201 2 13.8V7.2c0-1.1201 0-1.6802.218-2.108a1.9999 1.9999 0 0 1 .874-.874C3.5198 4 4.08 4 5.2 4Z"
			opacity={0.12}
		/>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M14 7h2.3373c.2445 0 .3668 0 .4819.0276a1 1 0 0 1 .2891.1198c.1009.0618.1874.1483.3603.3212l4.0628 4.0628c.1729.1729.2594.2594.3212.3603a.9981.9981 0 0 1 .1198.2891c.0276.1151.0276.2374.0276.4819V15.5c0 .4659 0 .6989-.0761.8827a1.0002 1.0002 0 0 1-.5412.5412C21.1989 17 20.9659 17 20.5 17m-5 0H14m0 0V7.2c0-1.1201 0-1.6802-.218-2.108a1.9997 1.9997 0 0 0-.874-.874C12.4802 4 11.9201 4 10.8 4H5.2c-1.1201 0-1.6802 0-2.108.218a1.9999 1.9999 0 0 0-.874.874C2 5.5198 2 6.08 2 7.2V15c0 1.1046.8954 2 2 2m10 0h-4m0 0c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3m6 0c0-1.6569-1.3431-3-3-3s-3 1.3431-3 3m16.5.5c0 1.3807-1.1193 2.5-2.5 2.5s-2.5-1.1193-2.5-2.5S16.6193 15 18 15s2.5 1.1193 2.5 2.5Z"
		/>
	</svg>
)

export default Truck01
