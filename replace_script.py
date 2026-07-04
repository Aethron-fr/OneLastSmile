import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 2. #giftIntro
html = html.replace(
    '<p class="gi-soft">Think of it as&hellip; a small gift.</p>',
    '<p class="gi-soft">Think of it as&hellip; the last thing I wanted to give you.</p>'
)

# 4. #birthdayFlow - #bdScreen1
html = html.replace('>3 January<', '>One Last Time<')
html = html.replace('>Hey&hellip; today is your day.<', '>Hey&hellip; I need to tell you something.<')
html = html.replace('I didn&rsquo;t want to just text you like everyone else.<br>\n        So I made something.', 'This isn&rsquo;t a birthday wish.<br>\n        It&rsquo;s something I needed to say, once, before I go.')

# #bdScreen2
html = html.replace('>For You<', '>The Truth<')
html = html.replace('>Happy Birthday, Anushka.<', '>I&rsquo;m leaving, Anushka.<')
html = html.replace('Not just another year&hellip;<br>\n        but another version of you<br>\n        the world gets to become.', 'Not for a few months.<br>\n        Not for university.<br>\n        For good, this time.')

# #bdScreen3
html = html.replace('>You matter more than you probably realize.<', '>This isn&rsquo;t me asking you to stop me.<')
html = html.replace('I don&rsquo;t say this often.<br>\n        But it&rsquo;s true, and it needed to be said.', 'It&rsquo;s already decided &mdash; for me,<br>\n        and I think, quietly, for you too.')

# #bdScreen4
html = html.replace('>Today<', '>After This<')
html = html.replace('>Today isn&rsquo;t about anything complicated.<', '>After today, I won&rsquo;t be around anymore.<')
html = html.replace('<p class="bd-text">No past. No confusion.</p>\n      <p class="bd-text">Just you.</p>', '<p class="bd-text">New city. New number.<br>\nNo more reaching out.</p>\n      <p class="bd-text">Not because I&rsquo;m angry &mdash; because I finally have to let this go.</p>')

# #bdScreen5
html = html.replace('>A Gift<', '>One Last Thing<')
html = html.replace('>This is just something I wanted to give you.<', '>This is just something I wanted to give you, before I go.<')
html = html.replace('>No expectations attached to it.<', '>No expectations attached to it.<br>\n        There never really were any.<')

# #bdScreen6
html = html.replace('>Quiet can still mean genuine.<', '>This was quiet, almost all of it.<br>\n        It was still real.<')

# #bdScreen7
html = html.replace('>So yeah&hellip; Happy Birthday.<', '>So&hellip; I hope life is genuinely good to you.<')
html = html.replace('I hope life gives you everything you deserve.<br>\n        And I genuinely mean that.', 'I mean that without any conditions.<br>\n        Take care of yourself, Anushka.')

# #bdScreenFinal
html = html.replace('If this is where it ends,<br>\n          let it end with a smile.', 'This is where it ends.<br>\n          Let it end with a smile.')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done")
