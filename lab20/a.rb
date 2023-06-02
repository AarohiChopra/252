class LinkedList
	attr_accessor :val, :next_node
	def initialize (val, next_node)
		@val = val
		@next_node = next_node
	end
	def get_node(n)
		if n == 0 then @val
		elsif @next_node then @next_node.get_node(n-1)
		else nil
		end
	end
	def each_node &blk
		puts "Reading #{@val}..."
		yield @val
		puts "Finished with #{@val}."
		@next_node.each_node &blk if @next_node
	end
	def method_missing(method_name)
# The regular expression matches any string that starts with ’it’
# followed exclusively by decimal digits.
if method_name.to_s.match(/^it\d+$/) then
	s = method_name.to_s
s.slice!("it") # Removes ’it’ from s
return get_node(s.to_i)
end
puts "#{method_name} is not a method for this object"
end
end
def make_list lst
	lst.reverse!
	linked_list = prev_node = nil
	lst.each do |x|
		linked_list = LinkedList.new(x, prev_node)
		prev_node = linked_list
	end
	linked_list
end
ll = make_list [9,4,6,12]
sum = 0
ll.each_node do |v|
	sum += v
end
puts sum
puts ll.it3
puts ll.it2