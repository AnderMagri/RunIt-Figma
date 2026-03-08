// FIGMA.EXE > CORE_ENGINE
figma.showUI(__html__, { width: 400, height: 500, themeColors: true });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'execute') {
    try {
      // Creates an async wrapper to allow 'await' in your pasted snippets
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const executeUserCode = new AsyncFunction('figma', msg.code);
      
      await executeUserCode(figma);
      
      figma.notify("✅ Execution successful");
      figma.ui.postMessage({ type: 'done' });
    } catch (err) {
      figma.notify("❌ Error: " + err.message, { error: true });
      console.error("Plugin Error:", err);
    }
  }
};