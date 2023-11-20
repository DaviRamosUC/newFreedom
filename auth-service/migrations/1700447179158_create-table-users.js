/* eslint-disable camelcase */

exports.shorthands = undefined;

//npm run migrate up
exports.up = pgm => {
    pgm.createTable('users', {
        id: 'id',
        email: { type: 'varchar(1000)', notNull: true, unique: true },
        senha: { type: 'varchar(1000)', notNull: true },
        jwt_token: {tyoe: 'text'},
        created_at: {type: 'timestamp', notNull: true},
        updated_at: {type: 'timestamp'}
      });    
};

//npm run migrate down
exports.down = pgm => {
    pgm.dropTable('users');
};
