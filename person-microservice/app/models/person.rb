require 'cassandra'

class Person
  @@cluster = Cassandra.cluster(hosts: [ENV['CASSANDRA_CONTACT_POINTS'] || 'localhost'])
  @@session = @@cluster.connect('people_keyspace')

  def self.all
    @@session.execute("SELECT * FROM persons").rows
  end

  def self.find_by_dni(dni)
    result = @@session.execute("SELECT * FROM persons WHERE dni = ?", arguments: [dni])
    result.first
  end

  def self.create(attrs)
    @@session.execute(
      "INSERT INTO persons (dni, first_name, last_name, email, phone) VALUES (?, ?, ?, ?, ?)",
      arguments: [
        attrs[:dni],
        attrs[:first_name],
        attrs[:last_name],
        attrs[:email],
        attrs[:phone]
      ]
    )
    find_by_dni(attrs[:dni])
  end

  def self.update(dni, attrs)
    @@session.execute(
      "UPDATE persons SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE dni = ?",
      arguments: [
        attrs[:first_name],
        attrs[:last_name],
        attrs[:email],
        attrs[:phone],
        dni
      ]
    )
    find_by_dni(dni)
  end

  def self.destroy(dni)
    @@session.execute("DELETE FROM persons WHERE dni = ?", arguments: [dni])
  end
end
