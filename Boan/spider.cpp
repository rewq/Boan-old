#include "spider.h"
#include <QDebug>
#include <QStandardItem>
#include <QUrl>
#include <QEvent>
#include <QObject>
#include <QEventLoop>
#include <QtNetwork/QNetworkAccessManager>
#include <QtNetwork/QNetworkReply>

spider::spider(){
    qDebug() << "Spider Running";
}

void spider::crawl(QStandardItem* rootnode, QString url){

    qDebug() << "Spider:" << url;

    // Example parsing url via Qurl for root url
    QUrl base = QUrl(url);
    qDebug() << base.host();
    qDebug() << base.topLevelDomain();
    qDebug() << base.path();

    // Add self to model
    QStandardItem *item = new QStandardItem(url);
    rootnode->appendRow(item);

    // Get the webpage
    QNetworkAccessManager manager;
    QNetworkReply *response = manager.get(QNetworkRequest(url));
    QEventLoop event;

    QObject::connect(response,SIGNAL(finished()),&event,SLOT(quit()));
    event.exec();

    QString html = response->readAll(); // Source should be stored here

    // Search for URLs
    QRegExp rx("<a href=\\\"(([^\"]*))\\\"");
    QString str = "Offsets: 12 14 99 231 7";
    QStringList list;

    int pos = 0;

    while ((pos = rx.indexIn(html, pos)) != -1) {
        list << rx.cap(1);
        pos += rx.matchedLength();
    }

    // Validate URLS
    //qDebug() << "Urls Found" << list; // shows all links found on page
    for( int i = 0; i < list.count(); i++ ){
        //qDebug() << QUrl(list[i]).path();
        if (!QUrl(list[i]).isRelative()){ // if the url in the list is a different domain out of scope


        // Add valid urls to model

        }
        if (!QUrl(list[i]).isRelative() && QUrl(list[i]).host() != base.host()){ // if the url in the list isnt a relative path and is a different domain
            QStandardItem *item = new QStandardItem(list[i]);
            rootnode->appendRow(item);
        }
    }




    //qDebug() << html;

    //QStandardItem *item = new QStandardItem(url);
    //rootnode->appendRow(item);
    //rootnode = item;
    //done
    return;
}

