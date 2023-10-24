import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x1B997Da77Ebf8f15CA6Aa65c574255c5e1FfB9f9'
);

export default instance;
