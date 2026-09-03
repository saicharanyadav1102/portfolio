import re

with open(r'C:\Users\HP\OneDrive\Desktop\Projects\portfolio11\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

start_tag = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">'
end_tag = '<!-- Education & Achievements (Full Width Alternating Section) -->'

start_idx = html.find(start_tag)
end_idx = html.find(end_tag)

print(f"start: {start_idx}, end: {end_idx}")

if start_idx != -1 and end_idx != -1:
    content_inside_grid = html[start_idx + len(start_tag):end_idx]
    match = re.search(r'(<!-- Developer Tools -->.*?</div>\s*</div>\s*</div>)', content_inside_grid, re.DOTALL)
    if match:
        cards_html = content_inside_grid[:match.end()]
        cards_html = cards_html.replace('class="group relative p-6', 'class="group relative p-6 w-[350px] md:w-[400px] shrink-0')
        
        marquee_html = f'''<div class="marquee-container w-full overflow-hidden relative cursor-grab active:cursor-grabbing">
                        <div class="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
                            {cards_html}
                            <!-- DUPLICATE FOR SEAMLESS LOOP -->
                            {cards_html}
                        </div>
                    '''
                    
        new_grid_content = marquee_html + content_inside_grid[match.end():]
        new_html = html[:start_idx] + new_grid_content + html[end_idx:]
        
        with open(r'C:\Users\HP\OneDrive\Desktop\Projects\portfolio11\index.html', 'w', encoding='utf-8') as out:
            out.write(new_html)
        print('Successfully replaced grid with infinite marquee.')
    else:
        print('Could not find the end of Developer Tools.')
else:
    print('Could not find start or end tags.')
