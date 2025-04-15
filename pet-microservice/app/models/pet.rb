require 'cassandra'
require 'date'
class Pet
    @@cluster = Cassandra.cluster(hosts: [ENV['CASSANDRA_CONTACT_POINTS'] || 'localhost'])
    @@session = @@cluster.connect('pets_keyspace')
  
    def self.all
      @@session.execute("SELECT * FROM pets").rows
    end
  
    def self.find_by_dni(dni)
      result = @@session.execute("SELECT * FROM pets WHERE owner_dni = ?", arguments: [dni])
      result.first
    end
  
    def self.create(attrs)
      @@session.execute(
        "INSERT INTO pets (owner_dni, pet_name, pet_weight, animal, birthdate) VALUES (?, ?, ?, ?, ?)",
        arguments: [
          attrs[:owner_dni],
          attrs[:pet_name],
          attrs[:pet_weight],
          attrs[:animal],
          attrs[:birthdate]
        ]
      )
      find_by_dni(attrs[:owner_dni])
    end
  
    def self.update(dni, attrs)
      @@session.execute(
        "UPDATE pets SET pet_name = ?, pet_weight = ?, animal = ?, birthdate = ? WHERE owner_dni = ?",
        arguments: [
          attrs[:pet_name],
          attrs[:pet_weight],
          attrs[:animal],
          attrs[:birthdate],
          dni
        ]
      )
      find_by_dni(dni)
    end
  
    def self.destroy(dni)
      @@session.execute("DELETE FROM pets WHERE owner_dni = ?", arguments: [dni])
    end
  end
  