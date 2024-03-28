
// Bostr config

module.exports = {
  mode: "private",

  // Server listener [Required]
  address: "0.0.0.0",
  port: "8008",

  // Clusters.
  // 0 will make bostr run clusters with available parallelism / CPU cores.
  clusters: 0,

  // Log about bouncer connection with relays?
  log_about_relays: true,

  // Time before reconnect to relays in miliseconds.
  reconnect_time: 3000,

  // Wait for every connected relays send EOSE.
  // Could improve accurancy on received events.
  //
  // Depending on your configured relays,
  // It may could cause loading problems in client due to slow EOSE from bouncer.
  // You could try fix this by changing <eose_timeout> or <max_eose_score> value.
  wait_eose: true,

  // Pause an subscription from receiving further events after reached to <filter.limit>
  // Could save client's bandwdith.
  //
  // Depending on <wait_eose> settings, It could either miss some events.
  pause_on_limit: true,

  // EOSE timeout in miliseconds
  eose_timeout: 3000,

  // Maximum of received EOSE from relays to send EOSE to client.
  // Normally, waiting EOSE from 3 relays should be enough. Leaving it with 0 equals wait for every established relays.
  // NOTE: Please adjust this max score correctly with your configured relays.
  //       If you only setted up 3 relays, Set the <max_eose_score> as 0.
  // Tip : The bigger = The more accurate EOSE, The less = EOSE sent way earlier.
  max_eose_score: 3,

  // A whitelist of users public keys who could use this bouncer.
  // Leaving this empty will allows everyone to use this bouncer.
  // NOTE: - Require NIP-42 compatible nostr client
  authorized_keys: [],

  // Used for accessing NIP-42 protected events from certain relays.
  // It could be your key. Leaving this empty completely disables NIP-42 function.
  //
  // You could use this function even as a public bouncer.
  // There are no security risk as it utilize NIP-42 to recognize client public key.
  //
  // NOTE: - Require NIP-42 compatible nostr client
  private_keys: {},
  // Tip: If you want to convert your pubkey/privatekey to hex,
  //      You could run the following command:
  //        $ node hexconverter.js npub....
  //        $ node hexconverter.js nsec....

  // Server information.
  // Only for when nostr client requesting server information.
  server_meta: {
    "contact": "unset",
    "pubkey": "0000000000000000000000000000000000000000000000000000000000000000",
    "description": "relay",
    "name": "nostr",
    "software": "secret",

    // Some nostr client may read the following for compatibility check.
    // You may change the supported_nips to match with what your relays supported.
    "supported_nips": [1,2,9,11,12,15,16,20,22,33,40,42,50],
    "version": require("./package.json").version
  },

  // Nostr relays to bounce [Required]
  relays: [
    "wss://relay.getalby.com/v1",
    "wss://relay1.nostrchat.io",
    "wss://yabu.me",
    "wss://relay.stoner.com",
    "wss://nostr.mom",
    "wss://nostr-relay.derekross.me",
    "wss://relay.nostromo.social",
    "wss://nostr.asdf.mx",
    "wss://nostr-01.bolt.observer",
    "wss://zee-relay.fly.dev",
    "wss://nostr.ch3n2k.com",
    "wss://relay.cryptocculture.com",
    "wss://relay.blowater.app",
    "wss://annal.purplerelay.com",
    "wss://at.nostrworks.com",
    "wss://blastr.f7z.xyz",
    "wss://btc.klendazu.com",
    "wss://cache2.primal.net/v1",
    "wss://damus.relay.center",
    "wss://eden.nostr.land",
    "wss://foolay.nostr.moe",
    "wss://nostr.lorentz.is",
    "wss://freespeech.casa",
    "wss://global.relay.red",
    "wss://hk.purplerelay.com",
    "wss://jp.purplerelay.com",
    "wss://knostr.neutrine.com",
    "wss://lightningrelay.com",
    "wss://n.ok0.org",
    "wss://nos.lol",
    "wss://nostr-01.yakihonne.com",
    "wss://nostr-pub.wellorder.net",
    "wss://nostr.swiss-enigma.ch",
    "wss://nostr.bitocial.xyz",
    "wss://relay.nostr.moctane.com",
    "wss://nostr.bongbong.com",
    "wss://nostr.cercatrova.me",
    "wss://nostr.cizmar.net",
    "wss://nostr.einundzwanzig.space",
    "wss://nostr.kaosfield.net",
    "wss://nostr.lu.ke",
    "wss://nostr.mikedilger.com",
    "wss://nostr.oxtr.dev",
    "wss://nostr.relayable.org",
    // "wss://nostr.relayer.se",   // => ECONNREFUSED
    "wss://nostr.wine",
    "wss://nostr21.com",
    "wss://nostrich.friendship.tw",
    "wss://offchain.pub",
    "wss://offchain.relay.center",
    "wss://relay.nostr.vet",
    "wss://purplerelay.com",
    "wss://relay.causes.com",
    "wss://nostr.maximacitadel.org",
    "wss://relay.lexingtonbitcoin.org",
    "wss://relay.damus.io",
    "wss://relay.hamnet.io",
    "wss://relay.lightwork.space",
    "wss://relay.mapboss.co.th",
    "wss://relay.nostr.band/",
    "wss://relay.nostr.info",
    "wss://nostr.island.network",
    "wss://relay.nostriches.org",
    "wss://relay.orange-crush.com",
    "wss://relay.primal.net",
    "wss://relay.sendstr.com",
    "wss://relay.snort.social",
    "wss://relay.wavlake.com",
    "wss://relay.wellorder.net",
    "wss://relayable.org",
    "wss://rsslay.nostr.moe",
    "wss://sg.qemura.xyz",
    "wss://snort.relay.center",
    "wss://spore.ws",
    "wss://th1.nostr.earnkrub.xyz",
    "wss://tictac.nostr1.com",
    "wss://za.purplerelay.com",
  ]
}
