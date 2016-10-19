#ifndef SPIDER_H
#define SPIDER_H

#include <QStandardItem>
#include <QStandardItemModel>

class spider
{
public:
    spider();
    void crawl(QStandardItem* rootnode, QString url );
};

#endif // SPIDER_H
