def mock_orm(orm_model, items = [])
  orm_double = double('ModelDouble')

  allow(orm_double).to receive(:all).and_return(orm_double)
  allow(orm_double).to receive(:where).and_return(orm_double)
  allow(orm_double).to receive(:offset).and_return(orm_double)
  allow(orm_double).to receive(:order).and_return(orm_double)
  allow(orm_double).to receive(:count) do items.size end
  allow(orm_double).to receive(:exists?) do items.size > 0 end
  allow(orm_double).to receive(:limit).and_return(items)
  allow(orm_double).to receive(:first) do items[0] end

  # queries
  allow(orm_model).to receive(:where).and_return(orm_double)
  allow(orm_model).to receive(:all) do orm_double.all end
  allow(orm_model).to receive(:order).and_return(orm_double)
  allow(orm_model).to receive(:count) do orm_double.count end
  allow(orm_model).to receive(:first) do orm_double.first end

  # persist
  allow(orm_model).to receive(:create) do |record|
    items.push(record)
    record
  end

  # instance
  allow(orm_model).to receive(:new).and_wrap_original do |original_method, attrs|
    instance = original_method.call(attrs)

    allow(instance).to receive(:save) do
      items.push(instance)
    end

    allow(instance).to receive(:save!) do
      items.push(instance)
    end

    instance
  end

  mock_clean(orm_model, [:where, :all, :order, :count, :first, :create, :new])
end

def mock_clean(mocked_class, mocked_methods = [])
  cleaner_double = double('MockCleaner')

  allow(cleaner_double).to receive(:clean) do
    mocked_methods.each do |method|
      allow(mocked_class).to receive(method).and_call_original
    end
  end

  cleaner_double
end
