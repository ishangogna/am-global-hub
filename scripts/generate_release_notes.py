"""
AM Global Hub — Comprehensive Website Documentation PDF
Generates: docs/am-global-hub-documentation.pdf
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    Table, TableStyle, KeepTogether, PageBreak
)
from reportlab.graphics.shapes import Drawing, Rect, String, Line, Circle, Group
from reportlab.graphics import renderPDF
from reportlab.platypus.flowables import Flowable
import os, math

OUT = os.path.join(os.path.dirname(__file__), '..', 'docs', 'am-global-hub-documentation.pdf')
os.makedirs(os.path.dirname(OUT), exist_ok=True)

# ── PALETTE ──────────────────────────────────────────────────────────────────
GOLD    = colors.HexColor('#B88A44')
GOLD_L  = colors.HexColor('#F8F0E0')
DARK    = colors.HexColor('#0F172A')
MUTED   = colors.HexColor('#667085')
BG      = colors.HexColor('#FAF7F2')
WHITE   = colors.white
GREEN   = colors.HexColor('#25D366')
GREEN_L = colors.HexColor('#E8F8EF')
RED_L   = colors.HexColor('#FEF2F2')
RED     = colors.HexColor('#EF4444')
BLUE    = colors.HexColor('#3B82F6')
BLUE_L  = colors.HexColor('#EFF6FF')
BORDER  = colors.HexColor('#E2D9CE')
CREAM   = colors.HexColor('#F8F4ED')
GREY    = colors.HexColor('#F1F5F9')
DARK2   = colors.HexColor('#1E293B')

PW, PH = A4
LM = RM = 18*mm
TM = BM = 16*mm
W = PW - LM - RM

# ── DOC ───────────────────────────────────────────────────────────────────────
def on_page(canvas, doc):
    canvas.saveState()
    # Footer bar
    canvas.setFillColor(DARK)
    canvas.rect(0, 0, PW, 10*mm, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont('Helvetica', 7)
    canvas.drawString(LM, 3.5*mm, 'AM Global Hub  ·  Website Documentation  ·  Confidential')
    canvas.drawRightString(PW - RM, 3.5*mm, f'Page {doc.page}')
    # Top accent line
    canvas.setFillColor(GOLD)
    canvas.rect(0, PH - 2, PW, 2, fill=1, stroke=0)
    canvas.restoreState()

doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    rightMargin=RM, leftMargin=LM,
    topMargin=TM, bottomMargin=BM + 10*mm,
    title='AM Global Hub — Website Documentation',
    author='AM Global Hub',
    onFirstPage=on_page, onLaterPages=on_page,
)

# ── STYLES ────────────────────────────────────────────────────────────────────
def S(name, **kw):
    return ParagraphStyle(name, **kw)

s_h1       = S('H1',  fontSize=18, leading=22, textColor=DARK,  fontName='Helvetica-Bold', spaceBefore=6,  spaceAfter=4)
s_h2       = S('H2',  fontSize=13, leading=17, textColor=GOLD,  fontName='Helvetica-Bold', spaceBefore=10, spaceAfter=3)
s_h3       = S('H3',  fontSize=10, leading=14, textColor=DARK,  fontName='Helvetica-Bold', spaceBefore=6,  spaceAfter=2)
s_body     = S('BD',  fontSize=9,  leading=14, textColor=DARK,  fontName='Helvetica',      spaceAfter=3)
s_bullet   = S('BL',  fontSize=9,  leading=13, textColor=DARK,  fontName='Helvetica',      leftIndent=14,  spaceAfter=2)
s_note     = S('NT',  fontSize=8,  leading=12, textColor=MUTED, fontName='Helvetica-Oblique', spaceAfter=3)
s_code     = S('CD',  fontSize=8,  leading=12, textColor=DARK2, fontName='Courier',        backColor=GREY, leftIndent=8, rightIndent=8, spaceBefore=4, spaceAfter=4)
s_center   = S('CT',  fontSize=8,  leading=12, textColor=MUTED, fontName='Helvetica',      alignment=TA_CENTER)
s_label    = S('LB',  fontSize=7,  leading=10, textColor=MUTED, fontName='Helvetica',      spaceAfter=1)
s_title_big= S('TB',  fontSize=32, leading=38, textColor=DARK,  fontName='Helvetica-Bold', spaceAfter=4)
s_subtitle = S('ST',  fontSize=12, leading=16, textColor=MUTED, fontName='Helvetica',      spaceAfter=6)
s_toc_item = S('TI',  fontSize=9.5,leading=14, textColor=DARK,  fontName='Helvetica',      spaceAfter=1)
s_toc_sec  = S('TS',  fontSize=11, leading=15, textColor=GOLD,  fontName='Helvetica-Bold', spaceBefore=6, spaceAfter=1)

def sp(h=6):  return Spacer(1, h)
def hr():     return HRFlowable(width='100%', thickness=0.4, color=BORDER, spaceAfter=5, spaceBefore=5)
def p(t):     return Paragraph(t, s_body)
def note(t):  return Paragraph(f'ℹ  {t}', s_note)
def warn(t):  return Paragraph(f'⚠  {t}', S('WN', fontSize=8, leading=12, textColor=RED, fontName='Helvetica-Oblique', spaceAfter=3))
def code(t):  return Paragraph(t.replace('\n','<br/>'), s_code)
def h1(t):    return Paragraph(t, s_h1)
def h2(t):    return Paragraph(t, s_h2)
def h3(t):    return Paragraph(t, s_h3)
def bul(items): return [Paragraph(f'<bullet>•</bullet> {i}', s_bullet) for i in items]

# ── VISUAL HELPERS ────────────────────────────────────────────────────────────

def info_box(title, items, color=GOLD_L, border=GOLD):
    rows = [[Paragraph(f'<b><font color="#B88A44">{title}</font></b>',
                        S('ib', fontSize=10, fontName='Helvetica-Bold', spaceAfter=4))]]
    rows += [[Paragraph(f'<bullet>•</bullet> {i}', s_bullet)] for i in items]
    t = Table(rows, colWidths=[W])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), color),
        ('BOX', (0,0), (-1,-1), 1, border),
        ('TOPPADDING', (0,0), (-1,-1), 6), ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 10), ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    return t

def two_col(left_items, right_items, left_w=None, right_w=None):
    lw = left_w or W * 0.5 - 3*mm
    rw = right_w or W * 0.5 - 3*mm
    t = Table([[left_items, right_items]], colWidths=[lw, rw])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    return t

def field_table(rows_data):
    """rows_data: list of [Field, Description, Required]"""
    header = ['Field', 'Description', 'Required']
    data = [header] + rows_data
    cw = [42*mm, W - 65*mm, 18*mm]
    t = Table(data, colWidths=cw)
    t.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 8),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('BACKGROUND', (0,0), (-1,0), DARK),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, CREAM]),
        ('GRID', (0,0), (-1,-1), 0.3, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 5), ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6), ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('FONTNAME', (0,1), (0,-1), 'Helvetica-Bold'),
        ('TEXTCOLOR', (0,1), (0,-1), DARK),
        ('ALIGN', (2,0), (2,-1), 'CENTER'),
    ]))
    return t

def badge_row(items, bg=GOLD, fg=WHITE):
    cells = [Paragraph(f'<font color="white"><b>{i}</b></font>',
                        S(f'br{n}', fontSize=8, fontName='Helvetica-Bold', alignment=TA_CENTER))
             for n, i in enumerate(items)]
    t = Table([cells], colWidths=[W/len(items)]*len(items))
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg),
        ('TOPPADDING', (0,0), (-1,-1), 6), ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 4), ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    return t

def route_table(rows):
    data = [['Route', 'Type', 'Auth', 'Description']] + rows
    cw = [40*mm, 18*mm, 14*mm, W - 80*mm]
    t = Table(data, colWidths=cw)
    t.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 8),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('BACKGROUND', (0,0), (-1,0), DARK),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, CREAM]),
        ('GRID', (0,0), (-1,-1), 0.3, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 5), ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6), ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('FONTNAME', (0,1), (0,-1), 'Courier'),
        ('FONTSIZE', (0,1), (0,-1), 7.5),
        ('TEXTCOLOR', (0,1), (0,-1), GOLD),
    ]))
    return t

# ── WIREFRAME DRAWABLES ───────────────────────────────────────────────────────

class Wireframe(Flowable):
    """Base class for inline ReportLab drawings that act as flowables."""
    def __init__(self, width, height):
        super().__init__()
        self.width = width
        self.height = height

    def draw_rect(self, c, x, y, w, h, fill=WHITE, stroke=BORDER, r=3, sw=0.5):
        c.setFillColor(fill); c.setStrokeColor(stroke); c.setLineWidth(sw)
        c.roundRect(x, y, w, h, r, fill=1, stroke=1)

    def draw_bar(self, c, x, y, w, h, fill=DARK):
        c.setFillColor(fill); c.rect(x, y, w, h, fill=1, stroke=0)

    def draw_label(self, c, x, y, text, size=6, color=MUTED, align='left', bold=False):
        c.setFillColor(color)
        c.setFont('Helvetica-Bold' if bold else 'Helvetica', size)
        if align == 'center':
            c.drawCentredString(x, y, text)
        elif align == 'right':
            c.drawRightString(x, y, text)
        else:
            c.drawString(x, y, text)

    def draw_pill(self, c, x, y, w, h, text, bg=GOLD, fg=WHITE, size=6):
        c.setFillColor(bg); c.roundRect(x, y, w, h, h/2, fill=1, stroke=0)
        c.setFillColor(fg); c.setFont('Helvetica-Bold', size)
        c.drawCentredString(x + w/2, y + h/2 - size*0.35, text)

    def draw_img_box(self, c, x, y, w, h, label='image'):
        c.setFillColor(CREAM); c.setStrokeColor(BORDER); c.setLineWidth(0.5)
        c.roundRect(x, y, w, h, 3, fill=1, stroke=1)
        c.setFillColor(MUTED); c.setFont('Helvetica', 6)
        c.drawCentredString(x + w/2, y + h/2 - 3, label)


# ─── Homepage wireframe ───────────────────────────────────────────────────────
class HomepageWireframe(Wireframe):
    def draw(self):
        c = self.canv
        x0, y0, bw, bh = 0, 0, self.width, self.height

        # Background
        c.setFillColor(BG); c.rect(x0, y0, bw, bh, fill=1, stroke=0)

        # Navbar
        self.draw_bar(c, x0, y0+bh-12, bw, 12, WHITE)
        c.setStrokeColor(BORDER); c.setLineWidth(0.3)
        c.line(x0, y0+bh-12, x0+bw, y0+bh-12)
        self.draw_label(c, x0+6, y0+bh-8, 'LOGO', 6, GOLD, bold=True)
        for i, lbl in enumerate(['Home','Products','Contact']):
            self.draw_label(c, x0+bw-80+i*26, y0+bh-8, lbl, 5, MUTED)
        self.draw_pill(c, x0+bw-18, y0+bh-10, 16, 7, 'Quote', GOLD)

        # Hero
        hero_y = y0+bh-60
        c.setFillColor(CREAM); c.rect(x0, hero_y, bw, 48, fill=1, stroke=0)
        self.draw_label(c, x0+8, hero_y+36, 'Premium Corporate Gifting', 5, GOLD)
        self.draw_label(c, x0+8, hero_y+27, 'Curated Gifts For', 8, DARK, bold=True)
        self.draw_label(c, x0+8, hero_y+18, 'Modern Businesses', 8, GOLD, bold=True)
        self.draw_pill(c, x0+8, hero_y+5, 28, 8, 'Explore', GOLD)
        self.draw_pill(c, x0+40, hero_y+5, 28, 8, 'Contact', WHITE)
        self.draw_img_box(c, x0+bw-55, hero_y+4, 50, 40, 'Hero Image')

        # How it Works
        hiw_y = hero_y - 30
        c.setFillColor(WHITE); c.rect(x0, hiw_y, bw, 28, fill=1, stroke=0)
        self.draw_label(c, x0+bw/2, hiw_y+22, 'How It Works', 7, DARK, align='center', bold=True)
        for i in range(4):
            bx = x0 + 8 + i*(bw/4 - 2)
            self.draw_rect(c, bx, hiw_y+2, bw/4-6, 18, CREAM)
            self.draw_label(c, bx+(bw/4-6)/2, hiw_y+8, f'Step {i+1}', 5, MUTED, align='center')

        # Categories
        cat_y = hiw_y - 32
        c.setFillColor(WHITE); c.rect(x0, cat_y, bw, 30, fill=1, stroke=0)
        self.draw_label(c, x0+8, cat_y+23, 'Categories', 7, DARK, bold=True)
        for i in range(4):
            bx = x0 + 4 + i*(bw/4 - 1)
            self.draw_img_box(c, bx, cat_y+2, bw/4-5, 18, 'Category')

        # Featured Products
        fp_y = cat_y - 34
        c.setFillColor(CREAM); c.rect(x0, fp_y, bw, 32, fill=1, stroke=0)
        self.draw_label(c, x0+8, fp_y+25, 'Featured Products', 7, DARK, bold=True)
        for i in range(4):
            bx = x0 + 4 + i*(bw/4 - 1)
            self.draw_rect(c, bx, fp_y+2, bw/4-5, 20, WHITE)
            self.draw_img_box(c, bx+2, fp_y+8, bw/4-9, 10)
            self.draw_pill(c, bx+2, fp_y+2, bw/4-9, 5, 'Quote', GOLD)

        # Footer
        self.draw_bar(c, x0, y0, bw, 10, DARK)
        self.draw_label(c, x0+bw/2, y0+4, 'Footer', 5, MUTED, align='center')

        # Section labels on right
        labels = [
            (y0+bh-6,  'Navbar'),
            (hero_y+24,'Hero Section'),
            (hiw_y+14, 'How It Works'),
            (cat_y+12, 'Categories'),
            (fp_y+16,  'Featured Products'),
            (y0+5,     'Footer'),
        ]
        c.setFillColor(GOLD); c.setFont('Helvetica', 5)
        for yy, lbl in labels:
            c.drawString(x0+bw+2, yy, lbl)


# ─── Products page wireframe ──────────────────────────────────────────────────
class ProductsWireframe(Wireframe):
    def draw(self):
        c = self.canv
        x0, y0, bw, bh = 0, 0, self.width, self.height
        c.setFillColor(BG); c.rect(x0, y0, bw, bh, fill=1, stroke=0)
        # Navbar
        self.draw_bar(c, x0, y0+bh-10, bw, 10, WHITE)
        self.draw_label(c, x0+6, y0+bh-7, 'NAVBAR', 5, MUTED)
        # Hero
        c.setFillColor(CREAM); c.rect(x0, y0+bh-42, bw, 32, fill=1, stroke=0)
        self.draw_label(c, x0+bw/2, y0+bh-22, 'Curated Gifts For Modern Businesses', 8, DARK, align='center', bold=True)
        # Search bar
        self.draw_rect(c, x0+bw/2-40, y0+bh-33, 80, 8, WHITE)
        self.draw_label(c, x0+bw/2, y0+bh-30, 'Search products...', 5, MUTED, align='center')
        self.draw_pill(c, x0+bw/2+30, y0+bh-33, 12, 8, 'Search', GOLD)
        # Filter bar
        filter_y = y0+bh-52
        c.setFillColor(WHITE); c.rect(x0, filter_y, bw, 10, fill=1, stroke=0)
        c.setStrokeColor(BORDER); c.line(x0, filter_y, x0+bw, filter_y)
        for i, lbl in enumerate(['All', 'Exec Kits', 'Tech', 'Drinkware', 'Hampers']):
            col = GOLD if i == 0 else WHITE
            self.draw_pill(c, x0+6+i*24, filter_y+2, 22, 6, lbl, col)
        # Grid 4x2
        grid_y = filter_y - 80
        for row in range(2):
            for col in range(4):
                cx = x0+4 + col*(bw/4-1)
                cy = filter_y-10 - row*38
                self.draw_rect(c, cx, cy, bw/4-6, 35, WHITE)
                self.draw_img_box(c, cx+2, cy+14, bw/4-10, 18)
                self.draw_label(c, cx+3, cy+8, 'Product Name', 5, DARK)
                self.draw_label(c, cx+3, cy+3, '₹500–₹1,200', 5, GOLD)
        # Result count
        self.draw_label(c, x0+6, filter_y-4, '16 products', 5, MUTED)


# ─── Product detail page wireframe ───────────────────────────────────────────
class ProductDetailWireframe(Wireframe):
    def draw(self):
        c = self.canv
        x0, y0, bw, bh = 0, 0, self.width, self.height
        c.setFillColor(BG); c.rect(x0, y0, bw, bh, fill=1, stroke=0)
        # Navbar
        self.draw_bar(c, x0, y0+bh-10, bw, 10, WHITE)
        self.draw_label(c, x0+6, y0+bh-7, 'NAVBAR', 5, MUTED)
        # Breadcrumb
        c.setFillColor(WHITE); c.rect(x0, y0+bh-18, bw, 8, fill=1, stroke=0)
        self.draw_label(c, x0+6, y0+bh-15, 'Home  >  Products  >  Category  >  Product Name', 5, MUTED)
        # Left: image
        lx = x0+4
        self.draw_rect(c, lx, y0+bh-88, bw*0.48, 68, WHITE)
        self.draw_img_box(c, lx+4, y0+bh-80, bw*0.48-10, 52, 'Product Image')
        # Feature badges
        for i, lbl in enumerate(['Delivery','Branding','Quality','Bulk']):
            bx = lx + i*(bw*0.48/4)
            self.draw_rect(c, bx+1, y0+bh-96, bw*0.48/4-3, 7, CREAM)
            self.draw_label(c, bx+bw*0.48/8, y0+bh-93, lbl, 4, MUTED, align='center')
        # Right: info
        rx = x0 + bw*0.52
        rw = bw*0.46
        self.draw_pill(c, rx, y0+bh-24, 28, 6, 'Category', GOLD_L)
        self.draw_label(c, rx, y0+bh-34, 'Product Name', 9, DARK, bold=True)
        self.draw_label(c, rx, y0+bh-42, '₹999–₹1,499 / unit', 8, GOLD)
        # Spec table
        self.draw_rect(c, rx, y0+bh-80, rw, 34, WHITE)
        specs = ['MOQ','Price Range','Category','Branding','Delivery']
        for i, s in enumerate(specs):
            sy = y0+bh-50 - i*6
            self.draw_label(c, rx+3, sy, s, 4.5, MUTED)
            self.draw_label(c, rx+rw-3, sy, '—', 4.5, DARK, align='right')
        # CTA buttons
        self.draw_pill(c, rx, y0+bh-87, rw, 8, 'Request a Quote', GOLD)
        self.draw_rect(c, rx, y0+bh-97, rw, 8, WHITE)
        self.draw_label(c, rx+rw/2, y0+bh-94, 'Talk to Our Team', 5, DARK, align='center')
        # Related products
        self.draw_label(c, x0+6, y0+bh-106, 'Related Products', 6, DARK, bold=True)
        for i in range(4):
            bx = x0+4 + i*(bw/4)
            self.draw_rect(c, bx, y0+4, bw/4-5, 20, WHITE)
            self.draw_img_box(c, bx+2, y0+10, bw/4-9, 11)
            self.draw_label(c, bx+3, y0+6, 'Related', 4, MUTED)


# ─── Contact page wireframe ───────────────────────────────────────────────────
class ContactWireframe(Wireframe):
    def draw(self):
        c = self.canv
        x0, y0, bw, bh = 0, 0, self.width, self.height
        c.setFillColor(BG); c.rect(x0, y0, bw, bh, fill=1, stroke=0)
        self.draw_bar(c, x0, y0+bh-10, bw, 10, WHITE)
        self.draw_label(c, x0+6, y0+bh-7, 'NAVBAR', 5, MUTED)
        # Hero
        c.setFillColor(CREAM); c.rect(x0, y0+bh-32, bw, 22, fill=1, stroke=0)
        self.draw_label(c, x0+bw/2, y0+bh-20, "We'd Love to Hear From You", 8, DARK, align='center', bold=True)
        self.draw_label(c, x0+bw/2, y0+bh-28, 'Get in Touch', 5, GOLD, align='center')
        # Left: form
        lw = bw*0.55
        self.draw_rect(c, x0+2, y0+6, lw-4, bh-42, WHITE)
        self.draw_label(c, x0+8, y0+bh-40, 'Send us a Message', 7, DARK, bold=True)
        fields = ['Full Name', 'Company', 'Email', 'Phone', 'Message']
        for i, f in enumerate(fields):
            fy = y0+bh-52 - i*14
            self.draw_rect(c, x0+6, fy, lw-16, 9, CREAM)
            self.draw_label(c, x0+10, fy+3, f, 5, MUTED)
        self.draw_pill(c, x0+6, y0+8, lw-16, 9, 'Send Message', GOLD)
        # Right: info cards
        rx = x0 + lw + 2
        rw = bw - lw - 4
        cards = [
            ('Meet the Team', CREAM, GOLD),
            ('Address', CREAM, GOLD),
            ('Phone', CREAM, GOLD),
            ('Instagram', colors.HexColor('#FDF4FF'), colors.HexColor('#C026D3')),
            ('WhatsApp', GREEN_L, GREEN),
            ('Hours', CREAM, GOLD),
        ]
        cy = y0+bh-38
        for label, bg, bc in cards:
            ch = 14 if label == 'Hours' else 10
            cy -= ch + 2
            if cy < y0: break
            c.setFillColor(bg); c.setStrokeColor(bc); c.setLineWidth(0.5)
            c.roundRect(rx, cy, rw, ch, 2, fill=1, stroke=1)
            c.setFillColor(bc); c.setFont('Helvetica-Bold', 5)
            c.drawString(rx+4, cy+ch-6, label)
        # Map
        self.draw_rect(c, x0+2, y0+2, bw-4, 4, CREAM)
        self.draw_label(c, x0+bw/2, y0+4, 'Google Maps Embed', 4.5, MUTED, align='center')


# ─── Admin wireframe ──────────────────────────────────────────────────────────
class AdminWireframe(Wireframe):
    def draw(self):
        c = self.canv
        x0, y0, bw, bh = 0, 0, self.width, self.height
        c.setFillColor(BG); c.rect(x0, y0, bw, bh, fill=1, stroke=0)
        # Top bar
        self.draw_bar(c, x0, y0+bh-12, bw, 12, WHITE)
        c.setStrokeColor(BORDER); c.line(x0, y0+bh-12, x0+bw, y0+bh-12)
        self.draw_label(c, x0+6, y0+bh-8, 'LOGO', 6, GOLD, bold=True)
        self.draw_pill(c, x0+40, y0+bh-10, 30, 6, 'Admin Dashboard', GOLD_L)
        self.draw_pill(c, x0+bw-20, y0+bh-10, 18, 6, 'Sign Out', RED_L)
        # Stats row
        stats_y = y0+bh-26
        for i, lbl in enumerate(['Products','Categories','Featured','Unfeatured']):
            sx = x0+2 + i*(bw/4)
            self.draw_rect(c, sx, stats_y, bw/4-3, 12, WHITE)
            self.draw_label(c, sx+3, stats_y+8, '12', 7, GOLD, bold=True)
            self.draw_label(c, sx+3, stats_y+2, lbl, 4.5, MUTED)
        # Tabs
        tab_y = stats_y - 10
        for i, lbl in enumerate(['Products','Categories','Featured']):
            col = GOLD if i == 0 else WHITE
            fg = WHITE if i == 0 else MUTED
            self.draw_pill(c, x0+4+i*32, tab_y, 30, 8, lbl, col)
        # Form (left)
        form_y = tab_y - 95
        self.draw_rect(c, x0+2, form_y, bw*0.38-2, 94, WHITE)
        self.draw_label(c, x0+6, tab_y-6, 'Add Product', 6, DARK, bold=True)
        # Image preview
        self.draw_img_box(c, x0+4, tab_y-28, bw*0.38-10, 18, 'Image Preview')
        fields = ['Product Name*','Slug','Description','Category','MOQ','Price Range']
        for i, f in enumerate(fields):
            fy = tab_y-36 - i*9
            if fy < form_y+2: break
            self.draw_rect(c, x0+4, fy, bw*0.38-10, 7, CREAM)
            self.draw_label(c, x0+7, fy+2, f, 4.5, MUTED)
        self.draw_pill(c, x0+4, form_y+3, bw*0.38-10, 8, '+ Add Product', GOLD)
        # Products grid (right)
        gx = x0 + bw*0.4
        gw = bw*0.6 - 4
        self.draw_label(c, gx, tab_y-4, 'All Products  (12)', 6, DARK, bold=True)
        for row in range(3):
            for col in range(3):
                cx2 = gx + col*(gw/3)
                cy2 = tab_y-16 - row*30
                if cy2 < form_y+2: break
                self.draw_rect(c, cx2+1, cy2, gw/3-3, 27, WHITE)
                self.draw_img_box(c, cx2+2, cy2+10, gw/3-6, 14)
                self.draw_label(c, cx2+3, cy2+6, 'Product', 4.5, DARK)
                self.draw_pill(c, cx2+2, cy2+1, gw/3-14, 5, 'View', CREAM)
                self.draw_pill(c, cx2+gw/3-12, cy2+1, 10, 5, 'Del', RED_L)


# ─── Quote modal wireframe ────────────────────────────────────────────────────
class QuoteModalWireframe(Wireframe):
    def draw(self):
        c = self.canv
        x0, y0, bw, bh = 0, 0, self.width, self.height
        # Blurred backdrop
        c.setFillColor(colors.HexColor('#0F172A')); c.setFillAlpha(0.5)
        c.rect(x0, y0, bw, bh, fill=1, stroke=0)
        c.setFillAlpha(1)
        # Modal card
        mw, mh = bw*0.8, bh*0.9
        mx, my = x0+(bw-mw)/2, y0+(bh-mh)/2
        c.setFillColor(WHITE); c.roundRect(mx, my, mw, mh, 5, fill=1, stroke=0)
        # Header
        c.setFillColor(CREAM); c.roundRect(mx, my+mh-16, mw, 16, 5, fill=1, stroke=0)
        c.setFillColor(DARK); c.setFont('Helvetica-Bold', 7)
        c.drawString(mx+6, my+mh-10, 'Request a Quote')
        c.setFillColor(MUTED); c.setFont('Helvetica', 5.5)
        c.drawString(mx+6, my+mh-15, 'Executive Gift Hamper')
        # X button
        c.setFillColor(CREAM); c.roundRect(mx+mw-14, my+mh-13, 10, 9, 2, fill=1, stroke=0)
        c.setFillColor(MUTED); c.setFont('Helvetica', 6); c.drawString(mx+mw-11, my+mh-9, '✕')
        # Form fields
        field_pairs = [('Full Name*','Company'),('Email*','Phone')]
        fy = my+mh-28
        for pair in field_pairs:
            for k, f in enumerate(pair):
                fx = mx+4 + k*(mw/2-2)
                fw = mw/2-8
                c.setFillColor(CREAM); c.roundRect(fx, fy, fw, 8, 2, fill=1, stroke=0)
                c.setFillColor(MUTED); c.setFont('Helvetica', 5); c.drawString(fx+3, fy+3, f)
            fy -= 11
        # Quantity
        c.setFillColor(CREAM); c.roundRect(mx+4, fy, mw-10, 8, 2, fill=1, stroke=0)
        c.setFillColor(MUTED); c.setFont('Helvetica', 5); c.drawString(mx+7, fy+3, 'Quantity Required*')
        fy -= 11
        # Notes
        c.setFillColor(CREAM); c.roundRect(mx+4, fy-8, mw-10, 16, 2, fill=1, stroke=0)
        c.setFillColor(MUTED); c.setFont('Helvetica', 5); c.drawString(mx+7, fy+4, 'Additional Notes')
        fy -= 22
        # Submit
        c.setFillColor(GOLD); c.roundRect(mx+4, fy, mw-10, 9, 3, fill=1, stroke=0)
        c.setFillColor(WHITE); c.setFont('Helvetica-Bold', 6); c.drawCentredString(mx+mw/2, fy+3, 'Submit Quote Request')
        fy -= 13
        # Divider
        c.setStrokeColor(BORDER); c.line(mx+4, fy+4, mx+mw/2-14, fy+4)
        c.setFillColor(MUTED); c.setFont('Helvetica', 4.5); c.drawCentredString(mx+mw/2, fy+2, 'or contact directly')
        c.line(mx+mw/2+14, fy+4, mx+mw-6, fy+4)
        fy -= 11
        # WhatsApp button
        c.setFillColor(GREEN_L); c.roundRect(mx+4, fy, mw-10, 9, 3, fill=1, stroke=0)
        c.setFillColor(GREEN); c.setFont('Helvetica-Bold', 6); c.drawCentredString(mx+mw/2, fy+3, 'WhatsApp Us')


# ─── Login page wireframe ─────────────────────────────────────────────────────
class LoginWireframe(Wireframe):
    def draw(self):
        c = self.canv
        x0, y0, bw, bh = 0, 0, self.width, self.height
        c.setFillColor(BG); c.rect(x0, y0, bw, bh, fill=1, stroke=0)
        # Card
        cw, ch = bw*0.55, bh*0.75
        cx, cy = x0+(bw-cw)/2, y0+(bh-ch)/2
        c.setFillColor(WHITE); c.roundRect(cx, cy, cw, ch, 5, fill=1, stroke=0)
        # Logo area
        c.setFillColor(GOLD); c.setFont('Helvetica-Bold', 9)
        c.drawCentredString(cx+cw/2, cy+ch-14, 'AM GLOBAL HUB')
        c.setFillColor(MUTED); c.setFont('Helvetica', 5.5)
        c.drawCentredString(cx+cw/2, cy+ch-20, 'ADMIN PORTAL')
        # Lock icon box
        c.setFillColor(GOLD_L); c.roundRect(cx+cw/2-8, cy+ch-34, 16, 12, 3, fill=1, stroke=0)
        c.setFillColor(GOLD); c.setFont('Helvetica-Bold', 8); c.drawCentredString(cx+cw/2, cy+ch-29, '🔒')
        # Sign in text
        c.setFillColor(DARK); c.setFont('Helvetica-Bold', 8); c.drawString(cx+8, cy+ch-42, 'Sign In')
        c.setFillColor(MUTED); c.setFont('Helvetica', 5.5); c.drawString(cx+8, cy+ch-48, 'Access the AM Global Hub admin dashboard.')
        # Fields
        for i, (label, placeholder) in enumerate([('Username','admin'),('Password','••••••••••••')]):
            fy = cy+ch-62 - i*18
            c.setFillColor(DARK); c.setFont('Helvetica-Bold', 5); c.drawString(cx+8, fy+10, label)
            c.setFillColor(CREAM); c.roundRect(cx+8, fy, cw-18, 9, 2, fill=1, stroke=0)
            c.setFillColor(MUTED); c.setFont('Helvetica', 5); c.drawString(cx+12, fy+3, placeholder)
        # Error state example
        fy2 = cy+ch-100
        c.setFillColor(RED_L); c.roundRect(cx+8, fy2, cw-18, 8, 2, fill=1, stroke=0)
        c.setFillColor(RED); c.setFont('Helvetica', 5); c.drawString(cx+12, fy2+3, 'Invalid username or password.')
        # Submit
        c.setFillColor(GOLD); c.roundRect(cx+8, cy+10, cw-18, 10, 3, fill=1, stroke=0)
        c.setFillColor(WHITE); c.setFont('Helvetica-Bold', 6.5); c.drawCentredString(cx+cw/2, cy+14, 'Sign In')


def wf(cls, w, h, caption=None):
    """Wrap a wireframe drawing with an optional caption."""
    items = []
    wf_inst = cls(w, h)
    border_tbl = Table([[wf_inst]], colWidths=[w])
    border_tbl.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.8, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    items.append(border_tbl)
    if caption:
        items.append(Paragraph(caption, s_center))
    return items


# ═════════════════════════════════════════════════════════════════════════════
# STORY
# ═════════════════════════════════════════════════════════════════════════════
story = []

# ─────────────────────────────────────────────────────────────────────────────
# COVER PAGE
# ─────────────────────────────────────────────────────────────────────────────
cover = Table(
    [[Paragraph('<font color="white"><b>AM GLOBAL HUB</b></font>',
                S('ca', fontSize=9, fontName='Helvetica-Bold', alignment=TA_CENTER)),
      Paragraph('<font color="white">Website Documentation · v1.0  ·  July 2026</font>',
                S('cb', fontSize=8, fontName='Helvetica', alignment=TA_CENTER))]],
    colWidths=[W*0.45, W*0.55]
)
cover.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,-1),GOLD),
    ('TOPPADDING',(0,0),(-1,-1),10),('BOTTOMPADDING',(0,0),(-1,-1),10),
    ('LEFTPADDING',(0,0),(-1,-1),12),('RIGHTPADDING',(0,0),(-1,-1),12),
]))
story += [
    cover, sp(22),
    Paragraph('AM Global Hub', s_title_big),
    Paragraph('Website Documentation', S('sd2', fontSize=20, leading=24, textColor=GOLD, fontName='Helvetica-Bold', spaceAfter=6)),
    Paragraph('A complete reference for all pages, features, and admin controls.', s_subtitle),
    sp(6), hr(), sp(6),
    badge_row(['Next.js 16', 'Supabase', 'Tailwind CSS', 'TypeScript', 'Framer Motion']),
    sp(20),
]

# Tech stack info box on cover
stack_data = [
    ['Component', 'Technology'],
    ['Framework',   'Next.js 16 (App Router)'],
    ['Database',    'Supabase (PostgreSQL)'],
    ['Styling',     'Tailwind CSS v3'],
    ['Language',    'TypeScript'],
    ['Hosting',     'Vercel (recommended)'],
    ['Auth',        'httpOnly cookie session'],
]
st = Table(stack_data, colWidths=[40*mm, W-40*mm])
st.setStyle(TableStyle([
    ('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTSIZE',(0,0),(-1,-1),9),
    ('TEXTCOLOR',(0,0),(-1,0),WHITE),('BACKGROUND',(0,0),(-1,0),DARK),
    ('ROWBACKGROUNDS',(0,1),(-1,-1),[WHITE,CREAM]),
    ('GRID',(0,0),(-1,-1),0.3,BORDER),
    ('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),
    ('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),
]))
story += [st, PageBreak()]

# ─────────────────────────────────────────────────────────────────────────────
# TABLE OF CONTENTS
# ─────────────────────────────────────────────────────────────────────────────
story += [h1('Table of Contents'), sp(4)]
toc_sections = [
    ('1', 'Site Overview & Routes', '3'),
    ('2', 'Homepage  (/)', '3'),
    ('3', 'Products Listing Page  (/products)', '4'),
    ('4', 'Product Detail Page  (/products/[slug])', '5'),
    ('5', 'Contact Page  (/contact)', '6'),
    ('6', 'Quote & WhatsApp System', '7'),
    ('7', 'Admin Login  (/admin/login)', '8'),
    ('8', 'Admin Dashboard  (/admin) — Full Guide', '8'),
    ('  8a', '   Tab: Products', '9'),
    ('  8b', '   Tab: Categories', '10'),
    ('  8c', '   Tab: Featured', '11'),
    ('9', 'Technical Notes & Pending Work', '12'),
]
toc_data = [['§', 'Section', 'Page']] + [[a,b,c] for a,b,c in toc_sections]
toc = Table(toc_data, colWidths=[12*mm, W-28*mm, 12*mm])
toc.setStyle(TableStyle([
    ('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTSIZE',(0,0),(-1,-1),9),
    ('TEXTCOLOR',(0,0),(-1,0),WHITE),('BACKGROUND',(0,0),(-1,0),DARK),
    ('ROWBACKGROUNDS',(0,1),(-1,-1),[WHITE,CREAM]),
    ('GRID',(0,0),(-1,-1),0.3,BORDER),
    ('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),
    ('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),
    ('TEXTCOLOR',(1,1),(1,-1),GOLD),('FONTNAME',(0,1),(0,-1),'Helvetica-Bold'),
    ('ALIGN',(2,0),(2,-1),'CENTER'),
]))
story += [toc, PageBreak()]

# ─────────────────────────────────────────────────────────────────────────────
# §1  SITE OVERVIEW
# ─────────────────────────────────────────────────────────────────────────────
story += [h1('§1  Site Overview & Routes'), sp(4),
    p('AM Global Hub is a premium corporate gifting website for businesses in India. It allows visitors to browse products, request quotes via a WhatsApp-integrated modal, and contact the team directly. A protected admin dashboard enables the owners to manage products, categories, and homepage content without any coding.'),
    sp(6),
]
story += [route_table([
    ['/','Page','No','Homepage — hero, categories, featured products, how it works'],
    ['/products','Page','No','Full product catalogue with search and category filters'],
    ['/products/[slug]','Page','No','Individual product detail page'],
    ['/categories/[slug]','Page','No','Products filtered by a single category'],
    ['/contact','Page','No','Contact form, team info, WhatsApp, Instagram, map'],
    ['/admin/login','Page','No','Admin login form'],
    ['/admin','Page','Yes','Admin dashboard (protected by session cookie)'],
    ['/api/admin/login','API','No','POST — validates credentials, sets httpOnly cookie'],
    ['/api/admin/logout','API','Yes','POST — clears session cookie'],
]), sp(4),
note('All /admin/* routes (except /admin/login) are intercepted by Next.js middleware. Unauthenticated requests are redirected to /admin/login automatically.'),
PageBreak()]

# ─────────────────────────────────────────────────────────────────────────────
# §2  HOMEPAGE
# ─────────────────────────────────────────────────────────────────────────────
story += [h1('§2  Homepage  (/)'), sp(4),
    p('The homepage is the main landing page. It is a Next.js server component that fetches live data from Supabase for categories and featured products. All other sections are static.'),
    sp(8),
]
# Wireframe + description side by side
wf_items = wf(HomepageWireframe, W*0.42, 200, 'Homepage layout wireframe')
desc_items = [
    h2('Sections'),
    *bul([
        '<b>Navbar</b> — fixed top bar with logo, navigation links (Home, Products, Contact) and a gold "Request Quote" CTA button. Fully responsive with a mobile slide-out menu.',
        '<b>Hero</b> — full-width section with headline, subtitle, stats (100+ clients, 1K+ orders), two CTA buttons: "Explore Collection" → /products and "Talk to Our Team" → /contact.',
        '<b>How It Works</b> — four-step process cards: Choose Products, Customize Branding, We Curate & Pack, Nationwide Delivery.',
        '<b>Categories</b> — live grid pulled from Supabase. Each card links to /categories/[slug]. Adding a category via /admin instantly appears here.',
        '<b>Featured Products</b> — live grid of products with featured = true in Supabase. Each card has a "Request Quote" button with the full quote modal. Section is hidden if no featured products exist.',
        '<b>Branding Section</b> — static section describing custom branding capabilities.',
        '<b>Footer</b> — dark footer with links, contact info, and category listings.',
    ]),
    sp(4), h2('Data Sources'),
    *bul([
        'Categories: SELECT * FROM categories ORDER BY created_at ASC',
        'Featured Products: SELECT * FROM products WHERE featured = true ORDER BY created_at DESC LIMIT 8',
    ]),
]
story += [two_col(wf_items, desc_items, W*0.44, W*0.54), sp(6), hr()]

story += [
    h2('Navigation CTAs'),
    *bul(['"Explore Collection" → /products', '"Talk to Our Team" → /contact', '"Request Quote" (navbar) → /contact']),
    PageBreak()
]

# ─────────────────────────────────────────────────────────────────────────────
# §3  PRODUCTS PAGE
# ─────────────────────────────────────────────────────────────────────────────
story += [h1('§3  Products Listing Page  (/products)'), sp(4),
    p('A live catalogue page showing all products from Supabase with real-time search and category filtering. The server component fetches categories at request time; the client component handles filtering and search without full page reloads.'),
    sp(8),
]
wf_items2 = wf(ProductsWireframe, W*0.42, 180, 'Products page wireframe')
desc_items2 = [
    h2('Layout Sections'),
    *bul([
        '<b>Hero</b> — centred headline with gold badge, subtitle, and pill-shaped search bar with inline Search button.',
        '<b>Filter Bar</b> — sticky bar below the navbar with category pill buttons. Active category is highlighted gold. Scrolls horizontally on mobile.',
        '<b>Result Count</b> — shows "N products" or "N products in [Category]" above the grid.',
        '<b>Product Grid</b> — 2 cols (mobile) / 3 cols (tablet) / 4 cols (desktop).',
        '<b>Skeleton Loaders</b> — 8 animated placeholder cards shown while data loads.',
        '<b>Empty State</b> — icon, message, and "Clear filters" button if no results.',
    ]),
    sp(4), h2('Product Card'),
    *bul([
        'Category label (gold, small caps) above the product name',
        'Product name — turns gold on hover',
        'Description preview (2-line clamp)',
        'Price range (bold) + MOQ below it',
        '"Featured" badge overlaid on image if applicable',
        'Arrow button fills gold on hover — entire card is a link to /products/[slug]',
    ]),
    sp(4), h2('Search & Filter'),
    *bul([
        'Search uses Supabase ilike query on the name column',
        'Category filter sets ?category=<id> in the URL — shareable/bookmarkable',
        'Both can be combined: search within a specific category',
    ]),
]
story += [two_col(wf_items2, desc_items2, W*0.44, W*0.54), PageBreak()]

# ─────────────────────────────────────────────────────────────────────────────
# §4  PRODUCT DETAIL PAGE
# ─────────────────────────────────────────────────────────────────────────────
story += [h1('§4  Product Detail Page  (/products/[slug])'), sp(4),
    p('Each product has its own dedicated page at /products/[slug]. This is a server-rendered page that fetches the product and related products from Supabase on every request.'),
    sp(8),
]
wf_items3 = wf(ProductDetailWireframe, W*0.44, 210, 'Product detail wireframe')
desc_items3 = [
    h2('Left Panel'),
    *bul([
        'Large product image with hover-zoom (scale 1.03)',
        'Four feature badges below the image: Pan India Delivery, Custom Branding, Quality Assured, Bulk Orders',
    ]),
    sp(4), h2('Right Panel'),
    *bul([
        '<b>Category pill</b> — gold badge linking conceptually to the category',
        '<b>Product name</b> — Playfair Display font, large',
        '<b>Price range</b> — gold, bold, with "/ unit (varies by qty)" note',
        '<b>Description</b> — full product description text',
        '<b>Specification table</b> — MOQ, Price Range, Category, Custom Branding, Delivery timeline',
        '<b>"Request a Quote" button</b> — gold, full-width, opens the quote modal',
        '<b>"Talk to Our Team" button</b> — outline, links to /contact',
        'Trust note: "🔒 Your enquiry is confidential."',
    ]),
    sp(4), h2('Related Products'),
    *bul([
        'Up to 4 products from the same category (excluding current)',
        'Each card links to its own detail page',
        '"View all →" link to /products',
    ]),
]
story += [two_col(wf_items3, desc_items3, W*0.46, W*0.52), sp(6),
    warn('If a slug does not exist in Supabase, the page returns a proper 404 (Next.js notFound()).'),
    PageBreak()
]

# ─────────────────────────────────────────────────────────────────────────────
# §5  CONTACT PAGE
# ─────────────────────────────────────────────────────────────────────────────
story += [h1('§5  Contact Page  (/contact)'), sp(4),
    p('The contact page provides multiple ways for potential clients to get in touch. It is a client component with a live form, business details, and direct communication links.'),
    sp(8),
]
wf_items4 = wf(ContactWireframe, W*0.42, 200, 'Contact page wireframe')
desc_items4 = [
    h2('Hero'),
    *bul(['"We\'d Love to Hear From You" — gold accent heading with subtitle.']),
    sp(4), h2('Contact Form (left)'),
    *bul([
        'Fields: Full Name*, Company, Email*, Phone, Message*',
        'Loading spinner on submit, success confirmation screen',
        'Success state shows name acknowledgement and a "Send another" button',
        'Note: currently simulates submission — wire to Supabase or Resend to go live',
    ]),
    sp(4), h2('Info Cards (right)'),
    *bul([
        '<b>Meet the Team</b> — bio for Raman Oberoi and Akshit Oberoi',
        '<b>Address</b> — Cabin No. 4, A-201, Block A, Lajpat Nagar I, New Delhi 110024 with "Open in Google Maps" link',
        '<b>Phone</b> — +91 83687 72989, clickable tel: link',
        '<b>Instagram</b> — gradient card, links to @amglobalhub',
        '<b>WhatsApp</b> — green card with "WhatsApp Us" button (Akshit, +91 8368772989), pre-filled message',
        '<b>Hours</b> — Mon–Sat 10 AM–5 PM (Sat 10:30 AM); Sunday Closed. Today\'s row highlighted gold.',
    ]),
    sp(4), h2('Map'),
    *bul(['Google Maps iframe embedded, pinned to Lajpat Nagar I, New Delhi.']),
]
story += [two_col(wf_items4, desc_items4, W*0.44, W*0.54), PageBreak()]

# ─────────────────────────────────────────────────────────────────────────────
# §6  QUOTE & WHATSAPP SYSTEM
# ─────────────────────────────────────────────────────────────────────────────
story += [h1('§6  Quote & WhatsApp System'), sp(4),
    p('A consistent quote request modal is used on both the Product Detail page and the Featured Product cards on the homepage. It collects enquiry details and offers a direct WhatsApp shortcut that pre-fills a message with all the form data.'),
    sp(8),
]
wf_items5 = wf(QuoteModalWireframe, W*0.40, 190, 'Quote modal wireframe')
desc_items5 = [
    h2('Modal Fields'),
    *bul(['Full Name (required)','Company','Email (required)','Phone','Quantity Required (required)','Additional Notes']),
    sp(4), h2('Behaviour'),
    *bul([
        'Triggered by "Request a Quote" / "Request Quote" buttons',
        'Full-screen backdrop with blur; click outside to close',
        'Loading spinner during submission',
        'Success screen with Done button + WhatsApp Us button',
        'Closing resets the form and success state',
    ]),
    sp(4), h2('WhatsApp Integration'),
    p('Tapping "WhatsApp Us" opens WhatsApp with a pre-filled message to <b>+91 8368772989</b> (Akshit). The message includes all filled-in form fields. Optional fields are omitted if blank.'),
]
story += [two_col(wf_items5, desc_items5, W*0.42, W*0.56), sp(6)]
story += [
    h2('Example WhatsApp Message'),
    code(
        "Hi, I'd like to request a quote for the following product on AM Global Hub:\n\n"
        "📦 Product: Executive Gift Hamper\n"
        "👤 Name: Jane Doe\n"
        "🏢 Company: Acme Corp\n"
        "📧 Email: jane@acme.com\n"
        "📞 Phone: +91 98765 43210\n"
        "🔢 Quantity Required: 100 units\n"
        "📝 Notes: Need logo branding on all packaging"
    ),
    note('Where the modal appears: /products/[slug] detail page and Featured Product cards on the homepage.'),
    PageBreak()
]

# ─────────────────────────────────────────────────────────────────────────────
# §7  ADMIN LOGIN
# ─────────────────────────────────────────────────────────────────────────────
story += [h1('§7  Admin Login  (/admin/login)'), sp(4)]
wf_items6 = wf(LoginWireframe, W*0.40, 160, 'Login page wireframe')
desc_items6 = [
    h2('How to Log In'),
    *bul([
        'Navigate to <b>/admin/login</b> in your browser',
        'Enter username: <b>admin</b>',
        'Enter password: <b>AmGlobalHub@123</b>',
        'Click <b>Sign In</b>',
        'On success, you are redirected to /admin',
    ]),
    sp(4), h2('Session Details'),
    *bul([
        'Session cookie lasts <b>7 days</b> — no re-login needed on the same device',
        'Cookie is httpOnly (not accessible by JavaScript)',
        'If already logged in, visiting /admin/login redirects straight to dashboard',
        'Invalid credentials show a red inline error message',
        'Password field has a show/hide toggle',
    ]),
    sp(4), h2('Changing Credentials'),
    p('Edit the USERNAME and PASSWORD constants in:'),
    code('src/app/api/admin/login/route.ts'),
]
story += [two_col(wf_items6, desc_items6, W*0.42, W*0.56), PageBreak()]

# ─────────────────────────────────────────────────────────────────────────────
# §8  ADMIN DASHBOARD
# ─────────────────────────────────────────────────────────────────────────────
story += [h1('§8  Admin Dashboard  (/admin)'), sp(4),
    p('The admin dashboard is the control centre for the entire website. It has three tabs: Products, Categories, and Featured. All changes take effect in Supabase immediately and are reflected on the live site on the next page load — no deployment required.'),
    sp(6),
]
story += [
    *wf(AdminWireframe, W, 170, 'Admin dashboard wireframe — Products tab view'),
    sp(8),
    info_box('Stats Row — always visible at the top', [
        'Total Products — count of all products in the database',
        'Categories — count of all categories',
        'Featured — count of products currently showing on the homepage',
        'Unfeatured — products not currently on the homepage',
    ]),
    sp(6),
    info_box('Sign Out', [
        'Click the "Sign Out" button (top-right corner) to clear the session cookie and return to /admin/login',
    ], RED_L, RED),
    PageBreak()
]

# ─────────────────────────────────────────────────────────────────────────────
# §8a  TAB: PRODUCTS
# ─────────────────────────────────────────────────────────────────────────────
story += [h2('§8a  Tab: Products'), sp(4),
    p('This is the default tab. The left side shows the Add Product form; the right side shows a grid of all existing products.'),
    sp(6), h3('Adding a Product'),
]
story += [field_table([
    ['Image URL',      'Paste any public image URL. A live preview renders above the field as you type. Fails gracefully if the URL is broken.', 'No'],
    ['Product Name',   'Full display name shown on cards and the detail page (e.g. "Executive Leather Notebook")', 'Yes'],
    ['Slug',           'Auto-generated from the name as you type. Click "Manual" to override. Used in /products/[slug]. Must be unique, lowercase, hyphens only.', 'Yes'],
    ['Description',    'Shown on the product card (2-line preview) and the full detail page.', 'No'],
    ['Category',       'Dropdown of existing categories. Determines which filter pill the product appears under.', 'No'],
    ['MOQ',            'Minimum Order Quantity as a plain number (e.g. 50). Shown on the card and detail page.', 'No'],
    ['Price Range',    'Display-only text string (e.g. ₹999–₹1,499). Not used for calculations.', 'No'],
    ['Featured toggle','If ON, the product appears in the Featured Products section on the homepage.', 'No'],
]), sp(6),
]
story += [
    h3('Slug Rules'),
    *bul([
        'Lowercase letters, numbers, and hyphens only — no spaces, no capitals',
        'Must be unique — two products cannot share a slug',
        'Used in the product URL: /products/<slug>',
        'Auto-mode generates from the name; click "Manual" to type your own',
    ]),
    sp(4),
    info_box('Example slugs', [
        '✅  executive-leather-notebook',
        '✅  wireless-charger-pro-v2',
        '❌  Executive Notebook  (has spaces and capitals)',
        '❌  wireless_charger  (has underscores)',
    ]),
    sp(6), h3('Managing Existing Products'),
    *bul([
        '"View Page" — opens /products/[slug] in a new browser tab so you can preview the live page',
        '"Delete" — permanently removes the product from Supabase. The product disappears from all pages immediately.',
    ]),
    warn('Deletion is permanent. There is no undo. The product is removed from all pages, the homepage featured section (if applicable), and the admin grid.'),
    PageBreak()
]

# ─────────────────────────────────────────────────────────────────────────────
# §8b  TAB: CATEGORIES
# ─────────────────────────────────────────────────────────────────────────────
story += [h2('§8b  Tab: Categories'), sp(4),
    p('Categories control two things simultaneously across the site:'),
    *bul([
        'The <b>filter pills</b> on the /products page — each category becomes a pill button',
        'The <b>Categories grid</b> on the homepage — each category appears as an image card',
    ]),
    sp(6), h3('Adding a Category'),
    field_table([
        ['Image URL',    'Used as the cover image on the homepage category card. Landscape images (16:9) work best.', 'No'],
        ['Category Name','Display name shown on the homepage card and the filter pill (e.g. "Executive Kits")', 'Yes'],
        ['Slug',         'Auto-generated from the name. Used in /categories/[slug] and the ?category= filter param.', 'Yes'],
        ['Description',  'Short text shown on the homepage category card below the name.', 'No'],
    ]),
    sp(6), h3('Effect of Adding a Category'),
    *bul([
        'Immediately appears as a pill on the /products filter bar',
        'Immediately appears as a card in the Categories section on the homepage',
        'Accessible at /categories/[slug]',
        'Becomes available in the Category dropdown when adding/editing products',
    ]),
    sp(6), h3('Managing Existing Categories'),
    *bul([
        '"View Page" — opens /categories/[slug] in a new tab',
        '"Delete" — removes the category from Supabase, the homepage, and the filter bar',
    ]),
    warn('Deleting a category does NOT reassign products that were linked to it. Those products will lose their category label and will not appear under any filter. You will need to manually reassign them via the Products tab by editing each product — or recreate the category with the same slug.'),
    sp(8),
    info_box('Image recommendations for categories', [
        'Format: JPG or PNG',
        'Aspect ratio: 16:9 or 4:3 — shown as a full-width cover image on the card',
        'Resolution: 1200×675px minimum for sharp display',
        'File size: under 500KB for fast loading',
        'Upload to Supabase Storage → copy the public URL → paste into Image URL field',
    ]),
    PageBreak()
]

# ─────────────────────────────────────────────────────────────────────────────
# §8c  TAB: FEATURED
# ─────────────────────────────────────────────────────────────────────────────
story += [h2('§8c  Tab: Featured'), sp(4),
    p('The Featured tab lets you control exactly which products appear in the "Featured Products" section on the homepage. Every product in the database is shown here as a card, regardless of whether it is currently featured or not.'),
    sp(6),
    info_box('How Featured Products work', [
        'Products with featured = true appear in the "Featured Products" section on the homepage',
        'They also get a "Featured" badge overlaid on their image on the /products listing page',
        'The homepage section is hidden automatically if no products are featured',
        'There is no upper limit — you can feature as many products as you like',
        'Changes are reflected on the homepage on the next page load (no deployment needed)',
    ]),
    sp(6), h3('Using the Featured Tab'),
    *bul([
        'Products currently featured are shown with a <b>gold border and ring</b>, plus a gold "Featured" overlay on the image',
        'Products not yet featured have a plain white card',
        'Click <b>"Add to Featured"</b> (gold button) on any card to feature it',
        'Click <b>"Remove from Featured"</b> (red outline button) on a featured card to unfeature it',
        'The stat card at the top of the page updates immediately to reflect the new count',
    ]),
    sp(6),
    Table([
        [Paragraph('<b>Action</b>', S('th', fontSize=9, fontName='Helvetica-Bold')),
         Paragraph('<b>What it does</b>', S('th2', fontSize=9, fontName='Helvetica-Bold'))],
        [Paragraph('Add to Featured', s_body),
         Paragraph('Sets featured = true in Supabase. Product appears on homepage on next visit.', s_body)],
        [Paragraph('Remove from Featured', s_body),
         Paragraph('Sets featured = false. Product is removed from homepage section on next visit.', s_body)],
    ], colWidths=[50*mm, W-50*mm],
    style=TableStyle([
        ('BACKGROUND',(0,0),(-1,0),DARK),('TEXTCOLOR',(0,0),(-1,0),WHITE),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[WHITE,CREAM]),
        ('GRID',(0,0),(-1,-1),0.3,BORDER),
        ('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6),
        ('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),
    ])),
    sp(6),
    note('Tip: Use this tab to quickly refresh what appears on the homepage for seasonal campaigns or new arrivals — no need to re-add or re-configure products.'),
    PageBreak()
]

# ─────────────────────────────────────────────────────────────────────────────
# §9  TECHNICAL NOTES & PENDING WORK
# ─────────────────────────────────────────────────────────────────────────────
story += [h1('§9  Technical Notes & Pending Work'), sp(4)]

story += [
    h2('Authentication'),
    *bul([
        'Session stored as an httpOnly cookie named admin_session',
        'Cookie value is a static token — suitable for a single-admin site',
        'secure: true in production (NODE_ENV = production), SameSite: lax',
        'TTL: 7 days (maxAge: 60 × 60 × 24 × 7)',
        'Next.js middleware (src/middleware.ts) intercepts /admin/* and redirects unauthenticated requests to /admin/login',
        'To change credentials: edit USERNAME and PASSWORD in src/app/api/admin/login/route.ts',
    ]),
    sp(6), h2('Supabase Tables'),
]

story += [
    Table([
        ['Table','Key Columns','Used By'],
        ['products',
         'id, name, slug, description,\nimage_url, category_id, moq,\nprice_range, featured, created_at',
         '/products, /products/[slug],\nhomepage, /admin'],
        ['categories',
         'id, name, slug, description,\nimage_url, created_at',
         '/products filter, homepage\ncategories, /admin'],
    ], colWidths=[28*mm, W*0.5-14*mm, W*0.5-14*mm],
    style=TableStyle([
        ('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTSIZE',(0,0),(-1,-1),8),
        ('TEXTCOLOR',(0,0),(-1,0),WHITE),('BACKGROUND',(0,0),(-1,0),DARK),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[WHITE,CREAM]),
        ('GRID',(0,0),(-1,-1),0.3,BORDER),
        ('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),
        ('LEFTPADDING',(0,0),(-1,-1),6),('RIGHTPADDING',(0,0),(-1,-1),6),
        ('FONTNAME',(0,1),(0,-1),'Courier'),('TEXTCOLOR',(0,1),(0,-1),GOLD),
        ('FONTSIZE',(1,1),(1,-1),7),('FONTSIZE',(2,1),(2,-1),7.5),
    ])),
    sp(8),
]

story += [
    h2('Pending / Recommended Work'),
    Table([
        ['Item', 'Location', 'Priority'],
        ['Wire contact form to real email/Supabase',
         'src/app/contact/page.tsx  →  handleSubmit', 'High'],
        ['Wire quote modal to store submissions',
         'RequestQuoteModal.tsx + FeaturedProductCard.tsx  →  handleSubmit', 'High'],
        ['Add Supabase RLS policies',
         'Supabase dashboard → Authentication → Policies', 'High'],
        ['Move admin credentials to .env.local',
         'src/app/api/admin/login/route.ts', 'Medium'],
        ['Add Edit Product functionality',
         '/admin — Products tab', 'Medium'],
        ['Add image upload via Supabase Storage',
         '/admin — replace URL field with file picker', 'Medium'],
        ['Add Edit Category functionality',
         '/admin — Categories tab', 'Low'],
    ], colWidths=[W*0.45, W*0.38, W*0.17],
    style=TableStyle([
        ('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTSIZE',(0,0),(-1,-1),8),
        ('TEXTCOLOR',(0,0),(-1,0),WHITE),('BACKGROUND',(0,0),(-1,0),DARK),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[WHITE,CREAM]),
        ('GRID',(0,0),(-1,-1),0.3,BORDER),
        ('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),
        ('LEFTPADDING',(0,0),(-1,-1),6),('RIGHTPADDING',(0,0),(-1,-1),6),
        ('FONTNAME',(1,1),(1,-1),'Courier'),('FONTSIZE',(1,1),(1,-1),7),
        ('TEXTCOLOR',(2,1),(2,-1),GOLD),
    ])),
    sp(12), hr(),
    Paragraph('AM Global Hub  ·  Website Documentation  ·  Confidential  ·  July 2026', s_center),
    sp(4),
    Paragraph('Generated automatically from source — do not distribute externally.', s_center),
]

# ─────────────────────────────────────────────────────────────────────────────
# BUILD
# ─────────────────────────────────────────────────────────────────────────────
doc.build(story)
print(f'\n✅  PDF generated → {os.path.abspath(OUT)}\n')
