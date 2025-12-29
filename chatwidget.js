/* ChatWidget - simple floating chat connected to an endpoint (e.g. n8n webhook)
   Usage:
     const w = new ChatWidget({ endpoint: 'https://.../webhook/chat', chatIconUrl: '...', logoUrl: '...', title: 'Support' });
     w.mount();
*/

(function (global) {
  const defaultOptions = {
    endpoint: '',            // required: URL to POST messages (n8n webhook)
    chatIconUrl: '',         // floating chat button image
    logoUrl: '',             // logo in header
    title: 'Chat',
    placeholder: 'Type your message here...',
    theme: {},
    position: { right: 24, bottom: 24 },
    sessionId: null,         // optional session id
    onMessageReceived: null, // hook: (msg) => {}
  };

  function makeEl(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    for (const k in attrs) {
      if (k === 'class') el.className = attrs[k];
      else if (k === 'style') Object.assign(el.style, attrs[k]);
      else if (k.startsWith('data-')) el.setAttribute(k, attrs[k]);
      else el[k] = attrs[k];
    }
    for (const c of children) {
      if (typeof c === 'string') el.appendChild(document.createTextNode(c));
      else if (c) el.appendChild(c);
    }
    return el;
  }

  class ChatWidget {
    constructor(opts = {}) {
      this.opts = Object.assign({}, defaultOptions, opts);
      if (opts.theme) Object.assign(document.documentElement.style, {
        '--primary': opts.theme.primary || getComputedStyle(document.documentElement).getPropertyValue('--primary'),
        '--accent': opts.theme.accent || getComputedStyle(document.documentElement).getPropertyValue('--accent'),
      });
      // session
      this.sessionId = this.opts.sessionId || ('sess_' + Math.random().toString(36).slice(2,9));
      this.root = null;
      this.isOpen = false;
      this._build();
    }

    _build() {
      // floating button
      this.btn = makeEl('button', { class: 'chat-widget-button', ariaLabel: 'Open chat' });
      if (this.opts.chatIconUrl) {
        const img = makeEl('img', { src: this.opts.chatIconUrl, alt: 'chat' });
        this.btn.appendChild(img);
      } else {
        // fallback icon - simple chat bubble
        this.btn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white"/></svg>';
      }

      // panel
      this.panel = makeEl('div', { class: 'chat-widget-panel', role: 'dialog', 'aria-hidden': 'true' });

      // header
      const header = makeEl('div', { class: 'chat-widget-header' });
      const logoWrap = makeEl('div', { class: 'logo' });
      if (this.opts.logoUrl) {
        const logoImg = makeEl('img', { src: this.opts.logoUrl, alt: 'logo' });
        logoWrap.appendChild(logoImg);
      } else {
        logoWrap.textContent = this.opts.title.charAt(0) || 'C';
      }
      const title = makeEl('div', { class: 'title' }, this.opts.title);
      const closeBtn = makeEl('button', { class: 'close', ariaLabel: 'Close chat' }, '✕');
      closeBtn.addEventListener('click', () => this.close());
      header.appendChild(logoWrap);
      header.appendChild(title);
      header.appendChild(closeBtn);

      // messages area
      this.messages = makeEl('div', { class: 'chat-widget-messages', role: 'log', 'aria-live': 'polite' });

      // input area
      const inputArea = makeEl('div', { class: 'chat-widget-input' });
      this.textarea = makeEl('textarea', { placeholder: this.opts.placeholder, rows: 1 });
      this.sendBtn = makeEl('button', { class: 'send' }, 'Send');
      this.sendBtn.addEventListener('click', () => this._onSend());
      this.textarea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') this._onSend();
        else if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this._onSend(); }
      });

      inputArea.appendChild(this.textarea);
      inputArea.appendChild(this.sendBtn);

      // assemble
      this.panel.appendChild(header);
      this.panel.appendChild(this.messages);
      this.panel.appendChild(inputArea);

      // toggles
      this.btn.addEventListener('click', () => this.toggle());

      // expose attachments
      this.root = makeEl('div', {});
      this.root.appendChild(this.btn);
      this.root.appendChild(this.panel);
    }

    mount(target = document.body) {
      target.appendChild(this.root);
      // apply position
      if (this.opts.position) {
        const r = this.opts.position;
        if (typeof r.right !== 'undefined') this.btn.style.right = (r.right + 'px');
        if (typeof r.bottom !== 'undefined') this.btn.style.bottom = (r.bottom + 'px');
      }
    }

    toggle() {
      if (this.isOpen) this.close();
      else this.open();
    }

    open() {
      this.panel.style.display = 'flex';
      this.panel.setAttribute('aria-hidden', 'false');
      this.isOpen = true;
      this.textarea.focus();
      // scroll to bottom
      setTimeout(() => this._scrollBottom(), 50);
    }

    close() {
      this.panel.style.display = 'none';
      this.panel.setAttribute('aria-hidden', 'true');
      this.isOpen = false;
    }

    _scrollBottom() {
      this.messages.scrollTop = this.messages.scrollHeight;
    }

    _appendMsg(text, who = 'bot') {
      const c = makeEl('div', { class: 'msg ' + (who === 'user' ? 'user' : 'bot') }, text);
      this.messages.appendChild(c);
      this._scrollBottom();
      if (typeof this.opts.onMessageReceived === 'function') {
        try { this.opts.onMessageReceived({ who, text, sessionId: this.sessionId }); } catch (e) { /* ignore */ }
      }
    }

    async _onSend() {
      const text = this.textarea.value.trim();
      if (!text) return;
      this._appendMsg(text, 'user');
      this.textarea.value = '';
      // show a small typing indicator
      const typingId = this._showTyping();
      try {
        await this.sendMessageToEndpoint(text);
      } catch (err) {
        console.error('ChatWidget send error', err);
        this._appendMsg('Sorry, something went wrong. Please try again later.', 'bot');
      } finally {
        this._hideTyping(typingId);
      }
    }

    _showTyping() {
      const el = makeEl('div', { class: 'typing', 'data-typing-id': Date.now() }, 'Bot is typing…');
      this.messages.appendChild(el);
      this._scrollBottom();
      return el.getAttribute('data-typing-id');
    }
    _hideTyping(dummy) {
      const nodes = this.messages.querySelectorAll('.typing');
      nodes.forEach(n => n.remove());
    }

    // Default transport: synchronous POST expecting JSON { reply: '...' }
    async sendMessageToEndpoint(message) {
      if (!this.opts.endpoint) throw new Error('ChatWidget: endpoint option required');
      const payload = {
        message,
        sessionId: this.sessionId,
        metadata: { origin: location.href }
      };
      const res = await fetch(this.opts.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'omit'
      });
      if (!res.ok) {
        const t = await res.text().catch(()=>null);
        throw new Error('Bad response: ' + res.status + ' ' + t);
      }
      // Expecting JSON like { reply: "..." } OR { replies: ["...","..."] }
      const j = await res.json().catch(()=>null);
      if (!j) {
        throw new Error('Invalid JSON response');
      }
      if (typeof j.reply === 'string') {
        this._appendMsg(j.reply, 'bot');
      } else if (Array.isArray(j.replies)) {
        j.replies.forEach(r => this._appendMsg(String(r), 'bot'));
      } else if (j.text) {
        this._appendMsg(String(j.text), 'bot');
      } else {
        // if the server returns complex structure, attempt to stringify a candidate
        this._appendMsg(JSON.stringify(j), 'bot');
      }
    }
  }

  // Expose globally
  global.ChatWidget = ChatWidget;
})(window);
