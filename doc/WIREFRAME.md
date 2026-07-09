# PacketFlow Wireframe Blueprint

## Frame 1: Landing / Home Page

**Frame name:** `Home / Landing`

**Canvas size:** 1440 x 1024

### Layout
- Top-right fixed button: `Login / Sign Up`
- Full-screen background:
  - Deep space gradient
  - Animated stars, planets, nebula glow
- Hero container centered vertically

### Sections

1. **Header CTA**
   - Badge: `CISCO INSPIRED • COSMIC NETWORK`
   - Headline:
     - `Visualize Networking.`
     - `Not Just Learn It.`
   - Subtext paragraph
   - Primary button: `Launch Simulator`
   - Secondary button: `Learn More`
   - Scroll indicator at bottom center

2. **Features section**
   - Section title: `Enterprise-Grade Features`
   - Subtitle
   - 3 cards in a row:
     - Card 1: `Drag & Drop Topology`
     - Card 2: `Packet Simulation`
     - Card 3: `OSI Visualization`
   - Each card contains icon, title, description

3. **How It Works**
   - Section title: `How It Works`
   - 3 step cards:
     - `01 Build`
     - `02 Connect`
     - `03 Simulate`
   - Each card has step number, title, description

4. **CTA banner**
   - Title: `Ready to explore networking visually?`
   - Supporting text
   - Button: `Start Building`
   - Link: `View Documentation`

5. **Footer**
   - Logo / brand name
   - Short tagline
   - Link groups: Product / Company / Legal
   - Copyright line

---

## Frame 2: Auth Modal Overlay

**Frame name:** `Auth Modal`

**Overlay size:** 720 x 640 (centered inside landing frame)

### Layout
- Full-screen translucent black overlay
- Centered modal card with rounded corners

### Content
- Top toggle tabs:
  - `Login`
  - `Sign Up`
- Close icon top-right
- Form content

### Login state
- Email field
- Password field
- Password show/hide icon
- `Forgot password?` link
- Submit button: `Login`

### Signup state
- Full Name field
- Email field
- Password field
- Confirm Password field
- Password show/hide icon
- Submit button: `Sign Up`

### Notes
- Error message area above form
- Terms / Privacy disclaimer below button

---

## Frame 3: Dashboard - Desktop

**Frame name:** `Dashboard - Desktop`

**Canvas size:** 1920 x 1080

### Layout
- Left sidebar fixed
- Top header full width
- Main content = canvas area
- Bottom panel = resizable console
- Optional mobile bottom quick bar hidden in desktop

### Sections

1. **Sidebar**
   - Collapsible panel
   - Top section: app brand / menu
   - Device categories list
   - Palette grids for:
     - End Devices
     - Infrastructure
     - Security
     - Servers
     - Specialized
     - Tools
   - Cable palette section
   - Device/cable drag handles

2. **Top bar**
   - Left: icon + title `PacketFlow Dashboard`
   - Center/Right:
     - Network status badge
     - Console toggle button
     - User profile avatar + email
     - Profile dropdown menu
   - Logout / Settings options in dropdown

3. **Canvas area**
   - Large central React Flow workspace
   - Background dark gradient
   - Device nodes placed on canvas
   - Drag & drop interactions
   - Node connectors and edges
   - In-canvas controls / quick action overlay (zoomable)

4. **Control bar**
   - Zoom controls:
     - `Zoom Out`
     - `Fit View`
     - `Zoom In`
   - Possible quick commands on desktop
   - Status indicator block

5. **Terminal panel**
   - Header with terminal title and icons
   - Buttons:
     - copy
     - clear
     - minimize / expand
   - Console log area
   - Command input row
   - Resizable drag handle at top of console

### Notes
- Console is initially open
- Panel height adjustable
- Message area scrolls
- Commands are typed and displayed in terminal style

---

## Frame 4: Dashboard - Mobile

**Frame name:** `Dashboard - Mobile`

**Canvas size:** 390 x 844

### Layout
- Top fixed header with menu button
- Canvas area takes majority
- Bottom quick actions bar
- Hidden sidebar drawer overlay

### Sections

1. **Header**
   - Menu toggle icon
   - App name or compact title
   - Status pill (online/offline)

2. **Canvas**
   - Full-screen workspace
   - Tap to select node
   - Drag devices from sidebar drawer

3. **Bottom quick bar**
   - Tools button
   - Zoom out
   - Fit view
   - Zoom in
   - Console toggle

4. **Sidebar drawer**
   - Slide-in panel
   - Same category list as desktop
   - Device and cable items

5. **Console**
   - Expandable at bottom
   - Compact terminal toggle
   - Input line and log preview

---

## Component Blocks for Figma

- `Header Bar`
  - Info badge
  - Navigation / buttons
- `Hero Panel`
  - Headline
  - Copy
  - CTA buttons
  - Visual accent
- `Feature Card`
  - Icon
  - Title
  - Description
- `Step Card`
  - Step number badge
  - Title
  - Body text
- `Sidebar Category`
  - Category header
  - Draggable item list
- `Device Node`
  - Icon
  - Device label
  - Type text
- `Console Panel`
  - Header row
  - Message area
  - Input row

---

## Suggested Figma Structure

- Page: `PacketFlow`
  - Frame: `Landing`
  - Frame: `Auth Modal`
  - Frame: `Dashboard - Desktop`
  - Frame: `Dashboard - Mobile`
- Components:
  - `Button / Primary`
  - `Button / Secondary`
  - `Card / Feature`
  - `Card / Step`
  - `Sidebar / Item`
  - `Terminal / Panel`
  - `Tag / Status`
