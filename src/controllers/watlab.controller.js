const { connectMessengerInstance, finalizeInstance, getStatusInstance, resumeInstance } = require('../core/watLabsService');
const { generatorInstance } = require('../core/cryptoInstance');

module.exports = {
  async sendMessage(req, res) {
    const { instance, message, to } = req.body;
    let sock;

    if (!instance || !to || !message) {
      return res.status(400).json({ error: 'Parâmetros obrigatórios: instance, to, message' });
    }

    try {
      const statusInstance = await getStatusInstance(instance);

      if (statusInstance === false) {
        // Já conecta a instância por dentro
        sock = await resumeInstance(instance);
      } else {
        // Conecta diretamente
        sock = await connectMessengerInstance(instance);
      }
      await sock.sendMessage(`${to}@s.whatsapp.net`, { text: message });

      await finalizeInstance(instance); // encerra a sessão após o envio

      res.status(200).json({
        success: true,
        instance,
        message,
        sent_at: new Date().toISOString(),
      })
    } catch (error) {
      console.error('❌ Erro ao enviar mensagem:', error);
      res.status(500).json({ error: error.message });
    }
  },
  async createInstance(req, res) {
    const { company, name } = req.body;

    if (!company || !name) {
      return res.status(400).json({ error: 'Parâmetros obrigatórios: company, name' });
    }

    try {
      const instance = await generatorInstance(company, name);
      res.status(201).json({
        success: true,
        instance,
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('❌ Erro ao criar instância:', error);
      res.status(500).json({ error: error.message });
    }
  }
};
