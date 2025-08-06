import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isRecommended?: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Все товары');

  const products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 139990,
      originalPrice: 149990,
      image: '/img/f988827b-1226-45ef-bc49-5cf1d568f162.jpg',
      category: 'Смартфоны',
      rating: 4.9,
      reviews: 1247,
      isNew: true,
      isRecommended: true
    },
    {
      id: 2,
      name: 'AirPods Pro 2',
      price: 29990,
      image: '/img/d71be1eb-22e1-4754-8d58-3398033a45f9.jpg',
      category: 'Наушники',
      rating: 4.8,
      reviews: 856,
      isRecommended: true
    },
    {
      id: 3,
      name: 'MacBook Pro 16"',
      price: 289990,
      image: '/img/abd5fa87-a0d4-4602-a324-1fe81ed79398.jpg',
      category: 'Ноутбуки',
      rating: 4.9,
      reviews: 432,
      isNew: true
    },
    {
      id: 4,
      name: 'iPad Air 5',
      price: 79990,
      originalPrice: 89990,
      image: '/img/f988827b-1226-45ef-bc49-5cf1d568f162.jpg',
      category: 'Планшеты',
      rating: 4.7,
      reviews: 624,
      isRecommended: true
    },
    {
      id: 5,
      name: 'Apple Watch Ultra',
      price: 99990,
      image: '/img/d71be1eb-22e1-4754-8d58-3398033a45f9.jpg',
      category: 'Часы',
      rating: 4.8,
      reviews: 312
    },
    {
      id: 6,
      name: 'iMac 24" M3',
      price: 189990,
      image: '/img/abd5fa87-a0d4-4602-a324-1fe81ed79398.jpg',
      category: 'Компьютеры',
      rating: 4.9,
      reviews: 187,
      isNew: true
    }
  ];

  const categories = ['Все товары', 'Смартфоны', 'Наушники', 'Ноутбуки', 'Планшеты', 'Часы', 'Компьютеры'];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1,
        image: product.image 
      }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все товары' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const recommendedProducts = products.filter(product => product.isRecommended);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-primary">TECH STORE</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#catalog" className="text-gray-600 hover:text-primary transition-colors">Каталог</a>
                <a href="#about" className="text-gray-600 hover:text-primary transition-colors">О нас</a>
                <a href="#delivery" className="text-gray-600 hover:text-primary transition-colors">Доставка</a>
                <a href="#payment" className="text-gray-600 hover:text-primary transition-colors">Оплата</a>
                <a href="#reviews" className="text-gray-600 hover:text-primary transition-colors">Отзывы</a>
                <a href="#contacts" className="text-gray-600 hover:text-primary transition-colors">Контакты</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
                <Icon name="Search" size={20} className="absolute left-3 top-3 text-gray-400" />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative"
              >
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 fade-in">Инновационные технологии</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto fade-in">
            Откройте мир передовых технологий с нашими умными рекомендациями и персональным подходом
          </p>
          <Button size="lg" variant="secondary" className="hover-scale">
            <Icon name="Sparkles" size={20} className="mr-2" />
            Получить рекомендации
          </Button>
        </div>
      </section>

      {/* Smart Recommendations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Icon name="Brain" size={20} className="text-primary mr-2" />
              <span className="text-primary font-medium">Умные рекомендации</span>
            </div>
            <h3 className="text-3xl font-bold mb-4">Подобрано специально для вас</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Наш ИИ анализирует ваши предпочтения и предлагает идеальные решения
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <Card key={product.id} className="hover-scale group overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary">
                      <Icon name="Zap" size={12} className="mr-1" />
                      Рекомендуем
                    </Badge>
                    {product.isNew && (
                      <Badge variant="secondary" className="absolute top-3 right-3">
                        Новинка
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-500 mb-3">
                    {product.category}
                  </CardDescription>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i}
                          name="Star" 
                          size={16} 
                          className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    onClick={() => addToCart(product)}
                    className="w-full"
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="hover-scale"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Каталог товаров</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover-scale group overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <Badge variant="secondary" className="absolute top-3 right-3">
                        Новинка
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-3">{product.name}</CardTitle>
                  <CardDescription className="text-gray-500 mb-4">
                    {product.category}
                  </CardDescription>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i}
                          name="Star" 
                          size={16} 
                          className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    onClick={() => addToCart(product)}
                    className="w-full"
                    size="lg"
                  >
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Добавить в корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">О нас</h3>
            <p className="text-lg text-gray-600 mb-8">
              Мы - команда энтузиастов, которые верят в силу инновационных технологий. 
              Наша миссия - делать передовые технологии доступными каждому.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Icon name="Truck" size={48} className="text-primary mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Быстрая доставка</h4>
                <p className="text-gray-600">Доставка по всей России за 1-3 дня</p>
              </div>
              <div className="text-center">
                <Icon name="Shield" size={48} className="text-primary mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Гарантия качества</h4>
                <p className="text-gray-600">Только оригинальные товары с гарантией</p>
              </div>
              <div className="text-center">
                <Icon name="HeadphonesIcon" size={48} className="text-primary mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Поддержка 24/7</h4>
                <p className="text-gray-600">Всегда готовы помочь вам</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">TECH STORE</h4>
              <p className="text-gray-300">
                Ваш надёжный партнёр в мире технологий
              </p>
            </div>
            <div id="delivery">
              <h5 className="font-semibold mb-3">Доставка</h5>
              <ul className="space-y-2 text-gray-300">
                <li>По Москве: 1 день</li>
                <li>По России: 2-5 дней</li>
                <li>Самовывоз: бесплатно</li>
              </ul>
            </div>
            <div id="payment">
              <h5 className="font-semibold mb-3">Оплата</h5>
              <ul className="space-y-2 text-gray-300">
                <li>Банковские карты</li>
                <li>Электронные кошельки</li>
                <li>Наличные при получении</li>
              </ul>
            </div>
            <div id="contacts">
              <h5 className="font-semibold mb-3">Контакты</h5>
              <ul className="space-y-2 text-gray-300">
                <li>+7 (495) 123-45-67</li>
                <li>info@techstore.ru</li>
                <li>Москва, ул. Тверская, 1</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-600" />
          <div className="text-center text-gray-300">
            <p>&copy; 2024 TECH STORE. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Корзина</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500">
                  <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Корзина пуста</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">Количество: {item.quantity}</p>
                        <p className="font-semibold text-primary">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Итого:</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(getTotalPrice())}</span>
                </div>
                <Button className="w-full" size="lg">
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оформить заказ
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;