
// Bostr config

module.exports = {
  mode: "public",

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
  //
  // "pubkey-in-hex",
  // "npub ....",
  // ....
  authorized_keys: [
  ],

  // Used for accessing NIP-42 protected events from certain relays.
  // It could be your key. Leaving this empty completely disables NIP-42 function.
  //
  // You could use this function even as a public bouncer.
  // There are no security risk as it utilize NIP-42 to recognize client public key.
  //
  // NOTE: - Require NIP-42 compatible nostr client
  //
  // "pubkey-in-hex": "privatekey",
  // "pubkey-in-hex": "nsec ...."
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
    // relay freerelay.xyz
    "wss://freerelay.xyz",

    // sub reverse relay new
    "ws://internal-alb-private-ff-production-1223236873.ap-northeast-1.elb.amazonaws.com:8009"
  ]
}
