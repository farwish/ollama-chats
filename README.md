# ollama-chats
Ollama chat client in Vue, everything you need to do your private text rpg in browser.

## What this is..
This "project" is a single web page desktop interface for chatting with your local
Ollama server. 

It requires you to have an installed web-server software, like NGINX, Apache, etc.
The reason for that is that Ollama's API is done via a local network server, and 
locally opened web pages (from disk) are not allowed to access network resources (for safety reasons), even if it's your local Ollama server. Thus, to make it work you need a local web-server software :).

## Why:
when i installed Ollama, i tried its built-in console chat interface but quickly realized it's nowhere enough to have fun, just enough to test the thing..

..then i looked up several existing interfaces and realized (again) that:
1. these things are either too big
2. or i'm too lazy to check all the code to ensure they do not send my local chats somewhere
3. i want to have it my way - that is for desktop and keyboard, not for mobile phones.
4. i want it to have a convenient keyboard driven interface and no unnecessary whistles.
 
## What:
I've spent several days to code this thing. My goals were:
1. fully local, so nothing is uploaded anywhere.
2. convenient chat interface for fun. (i.e. something unlike character.ai).
3. no unneeded dependancies that can inject fun code without me knowing that.
4. minimalistic.
5. browser based.
6. keyboard friendly.
 
And here we are. Whole thing is less than 30KB right now, that's including the
excerpts from Ollama documentation and html code. The only imported thing is Vue
which is a great web framework, probably used by millions of people, so it's pretty safe.
In other words, if you are paranoid, you can check the code in 15 minutes and ensure
you are totally safe with it. It's a very easy thing to just install and enjoy Ollama in seconds, if you already have web-server installed.

## Installation:
There is not much to install, it's a single index.html file.
The file needs to connect to your local Ollama server and for your browser to allow that, you need to have some web-server. 

 If you have one, there is not much to say, just put "index.html" from this project into any of your web folders, rename it as you wish if needed and access in browser.
 
 if you don't have a web-server, the easiest and the best one is NGINX. I do not have a goal of writing FAQ on NGINX here, there are tons online. So please consult with these. The short installation instruction, tho, is here: 
1. install nginx.
2. create a configuration file "ollama-chats.conf" in its configuration folder, (/etc/nginx/conf.d for linux, 
 /usr/local/etc/nginx/conf.d for freebsd, C:\nginx\conf\ for windows, but i never tried it on windows so i don't know for sure)
3. put in your config file something like this:
   
   ```
	 server {
	    listen 80;
	    server_name 127.0.0.1;
	    access_log /var/log/nginx/ollama-chat_access.log;
	    error_log  /var/log/nginx/ollama-chat_error.log;
      #path to a folder where your "web server" content is going to be, that is index.html of this project
	    root /var/www/html/;
	    index index.html;
	    location / {
	        try_files $uri $uri/ =404;.
	    }
	 }
   ```

5. Take care to set all paths to what you have, including the "root" folder to where you want it to be and copy the index.html file from this project there.
6. Make sure to set file permissions and file ownership of the index.html and of the root folder according to nginx rules, you can google it for your OS. On ubuntu, for example:
    * copy the index.html from this project to /var/www/html/index.html (root folder in config)
    * in console change the file permissions: sudo chmod 640 /var/www/html/index.html
    * in console change the file permissions: sudo chown "$USER":www-data /var/www/html/index.html
7. Start nginx (on ubuntu: sudo service nginx restart)
8. Access http://127.0.0.1/index.html in your browser
9. If you see some error, like file not found, etc, it means you've misconfigured nginx or file ownership/permissions.
10. If you configured your web server correctly, that's it.
 
## Features:
Now, let me list the features this thing has:

1. You can "prompt" the AI and see the replies in a chat form, as we all love. "Enter" button sends the reply, shift+enter allows making a line-break.
2. You can ask AI for another reply to your last prompt, by clicking on the arrow next to the message	or simply by clicking "right" arrow on the keyboard. Left arrow works as well ). If you have some text typed in your prompt and you are editing it, arrows will not	slide replies, obviously, for your convenience, as you may move cursor through the typed text. Same if you are editing something else, like settings.
3. You can do a similar thing with your own replies. Say, you are in a middle of conversation	and you see that AI doesn't like your reply, so you just click "right" arrow next to your	own message and it creates a new message. Then you just type in your new prompt, send it and that's it. You get a new "branch" of the conversation.
4. Under the "left" and "right" arrows for every "turn" of your chat there are numbers. These show how many alternative replies you do have there.
5. You can stop AI reply if it takes too long or if it's obviously wrong. Just hit "Escape" button on your keyboard.
6. You can see the number of every alternative reply, making it easy to remember which one you liked and return to it if no new ones are good.
7. You can edit any of the old messages. To do that, just click on the text of a message you wish to edit and that's it, simply edit it in place. But pay attention, there is no way back once you click away from editing. Until then, you can use ctrl+z of your browser to revert things. Once you've edited, there is no more old version anywhere, AI will see only the edited version, you too. You can edit both your own and AI replies. So, if there is a minor mistake made by AI in an otherwise perfect answer, it's very easy to fix it and continue having fun.
8. You can specify nicknames - yours and of AI. These nicknames are not used in any way, AI doesn't see them unless you use these in text, of course. The purpose of nicknames is to mark the messages visually, so you could know where your reply is and where AI speaks.
9.	You can rate the messages by clicking -- or ++. This rating does NOT affect anything at all. Ollama can't process such things on the fly. Why the rating is here?	Simple, if you are into finetuning, you can save your chat with ratings. Later, on your own, you may extract the dataset from the saved file (with your ratings) and  use it in your finetuning project. Obviously, it's out of scope of this thing, but the rating is here cos a lot of people do such things.
10.	When you open the page, it pulls the list of locally available models and adds these to the list.	The list is under the prompt text area. You can easily choose the model you wish to get reply from. Yes, you can do it anytime within the chat. So, if your current model provides bad replies at some point, why not to change it to some other model and to go on?
11.	If you do not have any installed models, it will suggest you to pull a model from ollama's library. Note: the page itself does not load anything, it just uses Ollama's functionality, and kindly asks Ollama to download a new model from its safe library. Ollama has that feature.
12.	Let's talk about lower menu:
    
12.1. Settings: allows you to specify all parameters that Ollama allows to specify. For your convenience i've copied explanations from Ollama docs, these are shown if you mouse over parameter names. Default values are shown to the right. If the parameter value is left empty, Ollama uses values from its modelfile, or default ones if modelfile doesn't have these. Parameters are applied upon each request, and according to Ollama's docs, they should change the rules on the fly.
   	
12.2. Pull: you can pull new models easily, just enter model's name from ollama.com/library and that's it. For example: "stablelm2:1.6b-zephyr", or just "stablelm2". Once the download is over, you will return to the main interface. Don't forget to choose the newly pulled model in the models list, it's not done automatically.
 
12.3. Reload models: you might install models manually in the console, in that case you can update the list by clicking this button.
 
12.4. system prompt: well, this is an obvious one. It's a system prompt for your model, where you can inform it that its life purpose is being a rose pony.
 
12.5. Instr: that's a trick you may use to help AI figure out what you want. It does a very simple thing - it injects one more message on behalf of AI with the text you enter here. So, you should write it from the point of view of the AI's character. For example: "(IMPORTANT!! in my next message, i should remember that i'm in a forest right now!)". That might save some nerve cells during the chat. That message is not added to the chat log and does not disappear on the next turn but injected every time. It's convenient to use it to summarize things  			 for AI as a reminder, so it doesn't loose track.. that much. Of course you can update it during the chat, to reflect what's going on in your RPG.
 
12.6. Prune: sometimes chats grow big.. and there are hundreds of garbage replies you don't care of. If you wish to keep only the current version of your chat, that is, ONLY the replies you can see on your screen when scrolling, then you can click "prune" and everything else will be deleted. You chat will seem as if all replies were like this from the very first attempt. It's better to save, before doing this.
 
12.7. Save: yes, you can save the chat, if you wish. the page saves everything and sends it to you as a file to download. It's not stored anywhere else. If you know what you are doing, you can always extract the replies and do local finetuning based on your good chats. The page does not provide interface for finetuning, that's something out of the scope of this thing.
 
12.8. Load: yes, again, you can load your old chat from a saved file and continue any time. Of course, if you have saved it earlier :).
 			 
### Enjoy!

P.S. If you wish to parse the saved file for replies, here is structure:

.turns -	an array that has all the messages data. each turn is next "line" of chat.

.turns.branches - an array of branches, each branch is tied to a single message in a previous turn

.turns.branch - id of the active branch holding messages for the active message in previous turn. it can be==-1, which means branch is inactive, user went by another branch
        
.turns.branches.msgs - an array, holding all the replies for a given message in a previous turn.

.turns.branches.msg - id of the finally selected message in this branch

.turns.tree - index to match previous messages to current branches, it's used to link previous turn's branch/msg to a current turn's branch. format is: 
  
    [previous turn's branch id][msg id within previous turn's branch]=current turn's branch

.turns.branches.msgs[id].content - message body

.turns.branches.msgs[id].role - user / assistant

.turns.branches.msgs[id].rating - 0 is bad, 1 is good, empty is no rating.
					
