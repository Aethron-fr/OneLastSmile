import re

with open('onelastsmile-react/src/components/BirthdayFlow.jsx', 'r', encoding='utf-8') as f:
    js = f.read()

# bdScreen1
js = js.replace("'3 January'", "'One Last Time'")
js = js.replace('"Hey\u2026 today is your day."', '"Hey\u2026 I need to tell you something."')
js = js.replace('"I didn\u2019t want to just text you like everyone else.\\nSo I made something."', '"This isn\u2019t a birthday wish.\\nIt\u2019s something I needed to say, once, before I go."')

# bdScreen2
js = js.replace("'For You'", "'The Truth'")
js = js.replace("'Happy Birthday, Anushka.'", "'I\u2019m leaving, Anushka.'")
js = js.replace('"Not just another year\u2026\\nbut another version of you\\nthe world gets to become."', '"Not for a few months.\\nNot for university.\\nFor good, this time."')

# bdScreen3
js = js.replace("'You matter more than you probably realize.'", "'This isn\u2019t me asking you to stop me.'")
js = js.replace('"I don\u2019t say this often.\\nBut it\u2019s true, and it needed to be said."', '"It\u2019s already decided \u2014 for me,\\nand I think, quietly, for you too."')

# bdScreen4
js = js.replace("'Today'", "'After This'")
js = js.replace('"Today isn\u2019t about anything complicated."', '"After today, I won\u2019t be around anymore."')
js = js.replace('"No past. No confusion.\\n\\nJust you."', '"New city. New number.\\nNo more reaching out.\\n\\nNot because I\u2019m angry \u2014 because I finally have to let this go."')

# bdScreen5
js = js.replace("'A Gift'", "'One Last Thing'")
js = js.replace("'This is just something I wanted to give you.'", "'This is just something I wanted to give you, before I go.'")
js = js.replace("'No expectations attached to it.'", '"No expectations attached to it.\\nThere never really were any."')

# bdScreen6
js = js.replace('"Some things don\u2019t need to be loud to be real."', '"This was quiet, almost all of it.\\nIt was still real."')

# bdScreen7
js = js.replace('"So yeah\u2026 Happy Birthday."', '"So\u2026 I hope life is genuinely good to you."')
js = js.replace('"I hope life gives you everything you deserve.\\nAnd I genuinely mean that."', '"I mean that without any conditions.\\nTake care of yourself, Anushka."')

# bdScreenFinal
js = js.replace('If this is where it ends,<br/>\\n            let it end with a smile.', 'This is where it ends.<br/>\\n            Let it end with a smile.')

with open('onelastsmile-react/src/components/BirthdayFlow.jsx', 'w', encoding='utf-8') as f:
    f.write(js)

print("Done React")
