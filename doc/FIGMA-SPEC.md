# PacketFlow Figma Spec

## File
- Name: `PacketFlow Wireframe`

## Page structure
- Page: `PacketFlow`
  - Frame: `Landing`
  - Frame: `Auth Modal`
  - Frame: `Dashboard - Desktop`
  - Frame: `Dashboard - Mobile`
- Page: `Components`
  - Component: `Button / Primary`
  - Component: `Button / Secondary`
  - Component: `Card / Feature`
  - Component: `Card / Step`
  - Component: `Sidebar / Category`
  - Component: `Sidebar / Item`
  - Component: `Terminal / Panel`
  - Component: `Status Tag / Online`
  - Component: `Status Tag / Offline`

---

## Design tokens

### Colors
- Primary: `#00A5E0`
- Primary Dark: `#0085C0`
- Accent: `#49B5E8`
- Surface: `#111827`
- Surface Light: `#1F2937`
- Border: `#374151`
- Text: `#E5E7EB`
- Text Muted: `#9CA3AF`
- Background: `#0B0F19`
- Success: `#10B981`
- Warning: `#F59E0B`
- Error: `#EF4444`

### Typography
- Heading 1: `72 / 80` Semi-bold
- Heading 2: `40 / 52` Bold
- Heading 3: `28 / 38` Semi-bold
- Body: `16 / 28` Regular
- Small: `14 / 22` Regular
- Mono: `14 / 20` Medium

### Effects
- Card shadow: `0 20px 50px rgba(0, 0, 0, 0.25)`
- Glow accent: `0 0 40px rgba(0, 165, 224, 0.20)`

---

## Frame: `Landing`

### Frame settings
- Size: `1440 x 1024`
- Background: radial gradient from `#0B0F19` to `#05070E`

### Grid / Layout
- Outer padding: `80`
- Content width: `1120`
- Sections spaced by `80`

### Elements

#### Top bar
- Position: top-right
- Button size: `180 x 52`
- Button spacing from edges: `32`

#### Hero block
- Width: `760`
- Spacing between hero elements: `32`

#### Badge
- Text style: `12 / 18`, uppercase, letter spacing `1.5`
- Background: `#00A5E0` 10%
- Padding: `12 20`
- Border radius: `999`

#### Headline
- Line 1: `Visualize Networking.`
- Line 2: `Not Just Learn It.`
- Text style line 2: gradient fill from `#00A5E0` to `#49B5E8`

#### Subtext
- Style: `16 / 28`, `#9CA3AF`
- Max width: `640`

#### CTA buttons
- Primary button height: `56`
- Secondary button height: `56`
- Primary padding: `24 32`
- Secondary padding: `24 32`
- Gap: `20`

#### Feature cards
- Container width: `1120`
- Card width: `360`
- Card height: `260`
- Card padding: `32`
- Card gap: `32`

##### Feature card content
- Icon size: `32`
- Title: `20 / 28` semi-bold
- Description: `16 / 24`
- Accent line: `48 x 4`

#### How It Works
- Section title: `36 / 44`
- Step cards: width `360`, height `260`
- Step number badge: `64 x 64`
- Step badge typography: `24 / 28`
- Step title: `24 / 32`
- Step description: `16 / 24`

#### CTA panel
- Height: `240`
- Padding: `40`
- Title: `32 / 40`
- Text: `16 / 24`
- Button gap: `20`

#### Footer
- Columns: 4
- Column gap: `32`
- Footer padding: `48 80`
- Footer text style: `14 / 22`

---

## Frame: `Auth Modal`

### Frame settings
- Size: `720 x 640`
- Overlay: black 60% opacity

### Modal card
- Width: `600`
- Background: `#111827`
- Border: `1px solid #1F2937`
- Radius: `24`
- Padding: `32`

### Header
- Toggle tabs:
  - `Login`
  - `Sign Up`
- Tab size: `140 x 48`
- Tab text: `16 / 24`
- Close icon top-right

### Form fields
- Field width: `100%`
- Field height: `56`
- Input padding: `16`
- Label style: `14 / 20`
- Helper text style: `12 / 18`
- Field border: `1px solid #374151`
- Field background: `#0F172A`

### Buttons
- Submit button height: `56`
- Submit button width: `100%`
- Button text style: `16 / 24`

### Notes
- Error banner height: auto
- Disclaimer text style: `12 / 18`
- Spacing between fields: `20`

---

## Frame: `Dashboard - Desktop`

### Frame settings
- Size: `1920 x 1080`
- Background: `#0B0F19`

### Layout
- Sidebar width: `320`
- Top header height: `80`
- Content padding: `24`
- Terminal height: `320`
- Spacing between sections: `24`

### Sidebar
- Width: `320`
- Padding: `24`
- Item height: `68`
- Item border radius: `18`
- Item gap: `16`
- Category heading style: `14 / 20` uppercase
- Device item text style: `15 / 24`

### Top bar
- Height: `80`
- Padding: `0 32`
- Title style: `20 / 28` bold
- Subtitle style: `13 / 20`

### Canvas area
- Full width inside content area
- Use dark gradient background: `#090D16` to `#0B0F19`
- Canvas padding: `20`
- Node frame radius: `16`
- Node border: `2px solid #00A5E0`

### Zoom controls
- Button size: `48 x 48`
- Gap: `12`

### Console panel
- Height: `320`
- Background: `#0F172A`
- Border: `1px solid #1F2937`
- Radius: `20`
- Header height: `56`
- Input row height: `56`
- Log padding: `20`
- Button icon size: `16`

### Console header
- Text style: `14 / 20`
- Badge text style: `12 / 18`
- Action button size: `40 x 40`

### Console input
- Prefix: `$`
- Input text style: `14 / 20` monospace
- Placeholder style: `14 / 20` muted

---

## Frame: `Dashboard - Mobile`

### Frame settings
- Size: `390 x 844`
- Background: `#0B0F19`

### Layout
- Top header height: `72`
- Bottom bar height: `88`
- Content padding: `20`

### Header
- Menu button size: `48 x 48`
- Title style: `18 / 24`
- Status pill width: `auto`, height: `28`

### Bottom quick bar
- 5 buttons
- Button size: `52 x 52`
- Spacing: `12`

### Drawer
- Width: `280`
- Background: `#111827`
- Padding: `20`
- Item height: `60`
- Item gap: `14`

### Console
- Height collapsed: `72`
- Height expanded: `260`
- Input height: `52`
- Log preview height: `160`

---

## Components

### Button / Primary
- Background: `#00A5E0`
- Text: `#FFFFFF`
- Radius: `16`
- Padding: `18 24`
- Shadow: `0 20px 50px rgba(0, 165, 224, 0.14)`

### Button / Secondary
- Background: `rgba(255, 255, 255, 0.04)`
- Border: `1px solid #374151`
- Text: `#E5E7EB`
- Radius: `16`
- Padding: `18 24`

### Card / Feature
- Width: `360`
- Padding: `32`
- Radius: `24`
- Background: `#111827`
- Border: `1px solid #1F2937`
- Shadow: `0 20px 50px rgba(0, 0, 0, 0.20)`

### Card / Step
- Width: `360`
- Padding: `28`
- Radius: `24`
- Background: `#111827`
- Border: `1px solid #1F2937`

### Sidebar / Category
- Text: `14 / 20` uppercase
- Color: `#9CA3AF`
- Spacing below: `12`

### Sidebar / Item
- Height: `68`
- Padding: `16`
- Radius: `18`
- Background: `#131B2B`
- Border: `1px solid #1F2937`
- Icon size: `20`

### Terminal / Panel
- Background: `#0F172A`
- Border: `1px solid #1F2937`
- Radius: `20`
- Header height: `56`
- Input height: `56`
- Padding: `20`

### Status Tag / Online
- Background: `#10B981`
- Text: `#FFFFFF`
- Radius: `999`
- Padding: `8 16`
- Text style: `12 / 20`

### Status Tag / Offline
- Background: `#EF4444`
- Text: `#FFFFFF`
- Radius: `999`
- Padding: `8 16`
- Text style: `12 / 20`

---

## Exact component naming for Figma
- `Button / Primary`
- `Button / Secondary`
- `Card / Feature`
- `Card / Step`
- `Sidebar / Category`
- `Sidebar / Item`
- `Terminal / Header`
- `Terminal / Input`
- `Status Tag / Online`
- `Status Tag / Offline`

---

## Suggested frame naming inside Figma
- `Landing`
- `Auth Modal`
- `Dashboard - Desktop`
- `Dashboard - Mobile`

---

## Quick build checklist
- [ ] Create file `PacketFlow Wireframe`
- [ ] Add page `PacketFlow`
- [ ] Add frames with exact sizes
- [ ] Add page `Components`
- [ ] Create token styles in Figma for colors and text
- [ ] Add buttons and cards as reusable components
- [ ] Build `Landing` with hero, feature cards, how it works, CTA, footer
- [ ] Build `Auth Modal` overlay
- [ ] Build `Dashboard - Desktop` with sidebar, top bar, canvas, terminal
- [ ] Build `Dashboard - Mobile` with header, drawer, canvas, bottom bar
